"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NotificationEventData } from "../types/notificationSSETypes";

const RECONNECT_DELAY_MS = 5000;

export interface UseNotificationSSEOptions {
  /** 로그인 등 연결 조건이 true일 때만 연결/유지 */
  enabled?: boolean;
  /** 연결 성공 시 (connect 이벤트) */
  onConnect?: (message: string) => void;
  /** 알림 수신 시 (notification 이벤트) */
  onNotification?: (data: NotificationEventData) => void;
  /** 연결 실패/끊김 시 재연결 대기 시간(ms). 기본 5초 */
  reconnectDelayMs?: number;
}

export interface UseNotificationSSEReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

// 프록시(/api) 경로를 사용하지 않고, 백엔드 오리진으로 직접 연결
// - NEXT_PUBLIC_API_URL 이 있으면 그 오리진을 사용
// - 없으면 개발 환경에서 window.location.origin에 붙도록 fallback
const getSSEBaseURL = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};

/**
 * FMI 알림 SSE 구독 훅
 * - GET /notifications/subscribe, 쿠키(access_token) 또는 Authorization 인증
 * - event: connect / notification 처리
 * - 오류 시 재연결 (기본 5초 후)
 */
export function useNotificationSSE({
  enabled = true,
  onConnect,
  onNotification,
  reconnectDelayMs = RECONNECT_DELAY_MS,
}: UseNotificationSSEOptions = {}): UseNotificationSSEReturn {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const connect = useCallback(() => {
    if (typeof window === "undefined") return;

    disconnect();

    const url = `${getSSEBaseURL()}/notifications/subscribe`;
    const eventSource = new EventSource(url, { withCredentials: true });
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("connect", (e: MessageEvent) => {
      setIsConnected(true);
      onConnect?.(typeof e.data === "string" ? e.data : "");
    });

    eventSource.addEventListener("notification", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data) as NotificationEventData;
        onNotification?.(data);
      } catch {
        // ignore parse error
      }
    });

    eventSource.onerror = () => {
      eventSource.close();
      eventSourceRef.current = null;
      setIsConnected(false);

      if (!enabledRef.current) return;

      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectTimeoutRef.current = null;
        connect();
      }, reconnectDelayMs);
    };
  }, [disconnect, onConnect, onNotification, reconnectDelayMs]);

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }
    return () => disconnect();
  }, [enabled, connect, disconnect]);

  return { isConnected, connect, disconnect };
}
