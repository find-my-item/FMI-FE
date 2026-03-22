"use client";

import type { NotificationEventData } from "../types/notificationSSETypes";

const ACCESS_TOKEN_API_PATH = "/api/auth/access-token";
const DEV_SSE_ACCESS_TOKEN_QUERY_KEY = "token";

/** HMR 시 모듈이 다시 로드되면서 `let eventSource`만 초기화되면, 브라우저에 남은 기존 EventSource와 새 연결이 겹친다. 전역에 붙여 한 인스턴스만 유지한다. */
const RUNTIME_KEY = "__fmi_notification_sse_runtime__";

type Handlers = {
  onNotification?: (data: NotificationEventData) => void;
  onConnect?: (message: string) => void;
  onConnectionState?: (connected: boolean) => void;
};

type SSERuntime = {
  eventSource: EventSource | null;
  connectionVersion: number;
  connectInFlight: boolean;
  wasConnected: boolean;
  shouldKeepAlive: boolean;
};

const handlers: Handlers = {};

function getRuntime(): SSERuntime {
  const g = globalThis as typeof globalThis & { [RUNTIME_KEY]?: SSERuntime };
  if (!g[RUNTIME_KEY]) {
    g[RUNTIME_KEY] = {
      eventSource: null,
      connectionVersion: 0,
      connectInFlight: false,
      wasConnected: false,
      shouldKeepAlive: false,
    };
  }
  return g[RUNTIME_KEY];
}

export function setNotificationSSEHandlers(next: Partial<Handlers>) {
  Object.assign(handlers, next);
}

async function buildSubscribeUrl(): Promise<string | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!apiBase) return null;

  const subscribeUrl = `${apiBase}/notifications/subscribe`;

  if (process.env.NODE_ENV !== "development") {
    return subscribeUrl;
  }

  try {
    const res = await fetch(ACCESS_TOKEN_API_PATH, { cache: "no-store" });
    if (!res.ok) return subscribeUrl;

    const data = (await res.json()) as { accessToken: string | null };
    const token = data.accessToken ?? undefined;
    if (!token) return subscribeUrl;

    const q = new URLSearchParams();
    q.set(DEV_SSE_ACCESS_TOKEN_QUERY_KEY, token);
    return `${subscribeUrl}?${q.toString()}`;
  } catch {
    return subscribeUrl;
  }
}

function release() {
  const rt = getRuntime();
  rt.connectionVersion += 1;
  if (rt.eventSource) {
    rt.eventSource.close();
    rt.eventSource = null;
  }
  handlers.onConnectionState?.(false);
}

export function disconnectNotificationSSE() {
  const rt = getRuntime();
  rt.connectInFlight = false;
  rt.shouldKeepAlive = false;
  rt.wasConnected = false;
  release();
}

export async function connectNotificationSSE(options?: { force?: boolean }): Promise<void> {
  if (typeof window === "undefined") return;

  const rt = getRuntime();
  const force = options?.force === true;

  if (!force) {
    if (rt.wasConnected) return;
    if (rt.eventSource?.readyState === EventSource.OPEN) return;
    if (rt.eventSource?.readyState === EventSource.CONNECTING) return;
    if (rt.connectInFlight) return;
  }

  rt.shouldKeepAlive = true;
  rt.connectInFlight = true;

  try {
    release();

    const version = rt.connectionVersion;

    const url = await buildSubscribeUrl();
    if (!url) return;

    if (rt.connectionVersion !== version) return;

    const es = new EventSource(url, { withCredentials: true });

    if (rt.connectionVersion !== version) {
      es.close();
      return;
    }

    rt.eventSource = es;

    es.addEventListener("connect", (e: MessageEvent) => {
      if (rt.connectionVersion !== version || rt.eventSource !== es) return;
      rt.wasConnected = true;
      handlers.onConnectionState?.(true);
      handlers.onConnect?.(typeof e.data === "string" ? e.data : "");
    });

    es.addEventListener("notification", (e: MessageEvent) => {
      if (rt.connectionVersion !== version || rt.eventSource !== es) return;
      const data = JSON.parse(e.data) as NotificationEventData;
      handlers.onNotification?.(data);
    });

    es.onerror = () => {
      if (rt.connectionVersion !== version || rt.eventSource !== es) return;
      if (!rt.shouldKeepAlive) {
        es.close();
        rt.eventSource = null;
        handlers.onConnectionState?.(false);
        return;
      }

      // 최초 연결 성공 이후에는 자동 재연결 루프를 막는다.
      if (rt.wasConnected) {
        es.close();
        rt.eventSource = null;
        handlers.onConnectionState?.(false);
        return;
      }

      if (es.readyState === EventSource.CLOSED) {
        handlers.onConnectionState?.(false);
      }
    };
  } finally {
    rt.connectInFlight = false;
  }
}
