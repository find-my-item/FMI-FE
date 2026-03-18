"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NotificationEventData } from "../types/notificationSSETypes";

// TODO(형준): exponential backoff 검토 후 적용 필요
const RECONNECT_DELAY_MS = 5000;
const REFRESH_AFTER_CONSECUTIVE_FAILURES = 3;

interface UseNotificationSSEOptions {
  /** 로그인 등 연결 조건이 true일 때만 연결/유지 */
  enabled?: boolean;
  /** 토큰 변경 등으로 강제 재연결이 필요할 때 변경되는 키 */
  connectionKey?: string;
  /** 연결 성공 시 (connect 이벤트) */
  onConnect?: (message: string) => void;
  /** 알림 수신 시 (notification 이벤트) */
  onNotification?: (data: NotificationEventData) => void;
  /** 최신 액세스 토큰 조회 */
  getAccessToken: () => Promise<string | undefined>;
  /** 연속 연결 실패 시 토큰 재발급 */
  refreshAccessToken?: () => Promise<boolean>;
  /** 연결 실패/끊김 시 재연결 대기 시간(ms). 기본 5초 */
  reconnectDelayMs?: number;
}

interface UseNotificationSSEReturn {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const useNotificationSSE = ({
  enabled = true,
  connectionKey,
  onConnect,
  onNotification,
  getAccessToken,
  refreshAccessToken,
  reconnectDelayMs = RECONNECT_DELAY_MS,
}: UseNotificationSSEOptions): UseNotificationSSEReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const consecutiveFailureRef = useRef(0);
  const enabledRef = useRef(enabled);
  const connectRef = useRef<() => Promise<void>>(async () => {});
  const connectionVersionRef = useRef(0);

  enabledRef.current = enabled;

  const clearReconnectTimeout = useCallback(() => {
    if (!reconnectTimeoutRef.current) return;

    clearTimeout(reconnectTimeoutRef.current);
    reconnectTimeoutRef.current = null;
  }, []);

  const disconnect = useCallback(() => {
    clearReconnectTimeout();
    connectionVersionRef.current += 1;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setIsConnected(false);
  }, [clearReconnectTimeout]);

  const scheduleReconnect = useCallback(
    (delayMs: number) => {
      if (!enabledRef.current) return;

      clearReconnectTimeout();
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectTimeoutRef.current = null;
        void connectRef.current();
      }, delayMs);
    },
    [clearReconnectTimeout]
  );

  const connect = useCallback(async () => {
    if (typeof window === "undefined") return;

    disconnect();
    const connectionVersion = connectionVersionRef.current;

    const accessToken = await getAccessToken();

    if (connectionVersionRef.current !== connectionVersion) {
      return;
    }

    if (!enabledRef.current || !accessToken) {
      consecutiveFailureRef.current = 0;
      return;
    }

    // TODO(형준): 토큰 노출 문제 해결 필요
    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe?token=${encodeURIComponent(accessToken)}`;
    const eventSource = new EventSource(url);

    if (connectionVersionRef.current !== connectionVersion) {
      eventSource.close();
      return;
    }

    eventSourceRef.current = eventSource;

    eventSource.addEventListener("connect", (e: MessageEvent) => {
      if (
        connectionVersionRef.current !== connectionVersion ||
        eventSourceRef.current !== eventSource
      ) {
        return;
      }

      consecutiveFailureRef.current = 0;
      setIsConnected(true);
      onConnect?.(typeof e.data === "string" ? e.data : "");
    });

    eventSource.addEventListener("notification", (e: MessageEvent) => {
      if (
        connectionVersionRef.current !== connectionVersion ||
        eventSourceRef.current !== eventSource
      ) {
        return;
      }

      const data = JSON.parse(e.data) as NotificationEventData;
      onNotification?.(data);
    });

    eventSource.onerror = () => {
      void (async () => {
        if (
          connectionVersionRef.current !== connectionVersion ||
          eventSourceRef.current !== eventSource
        ) {
          return;
        }

        eventSource.close();
        eventSourceRef.current = null;
        setIsConnected(false);

        if (!enabledRef.current) return;

        const nextFailureCount = consecutiveFailureRef.current + 1;
        consecutiveFailureRef.current = nextFailureCount;

        if (nextFailureCount < REFRESH_AFTER_CONSECUTIVE_FAILURES) {
          scheduleReconnect(reconnectDelayMs);
          return;
        }

        consecutiveFailureRef.current = 0;

        const isRefreshSucceeded = (await refreshAccessToken?.()) ?? false;

        if (!enabledRef.current || !isRefreshSucceeded) return;

        scheduleReconnect(0);
      })();
    };
  }, [
    disconnect,
    getAccessToken,
    onConnect,
    onNotification,
    reconnectDelayMs,
    refreshAccessToken,
    scheduleReconnect,
  ]);

  connectRef.current = connect;

  useEffect(() => {
    if (enabled) {
      consecutiveFailureRef.current = 0;
      void connect();
    } else {
      disconnect();
    }

    return () => disconnect();
  }, [enabled, connectionKey, connect, disconnect]);

  return { isConnected, connect, disconnect };
};

export default useNotificationSSE;
