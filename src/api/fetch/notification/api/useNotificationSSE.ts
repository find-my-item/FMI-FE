"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NotificationEventData } from "../types/notificationSSETypes";

const RECONNECT_DELAY_MS = 5000;
const MAX_RECONNECT_ATTEMPTS = 3;

export interface UseNotificationSSEOptions {
  /** 로그인 등 연결 조건이 true일 때만 연결/유지 */
  enabled?: boolean;
  /** 연결 성공 시 (connect 이벤트) */
  onConnect?: (message: string) => void;
  /** 알림 수신 시 (notification 이벤트) */
  onNotification?: (data: NotificationEventData) => void;
  /** 액세스 토큰 (쿼리 파라미터로 전달) */
  accessToken?: string;
  /** 연결 실패/끊김 시 재연결 대기 시간(ms). 기본 5초 */
  reconnectDelayMs?: number;
}

export interface UseNotificationSSEReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export function useNotificationSSE({
  enabled = true,
  onConnect,
  onNotification,
  accessToken,
  reconnectDelayMs = RECONNECT_DELAY_MS,
}: UseNotificationSSEOptions = {}): UseNotificationSSEReturn {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptRef = useRef(0);
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

    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe?token=${accessToken}`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("connect", (e: MessageEvent) => {
      reconnectAttemptRef.current = 0;
      setIsConnected(true);
      onConnect?.(typeof e.data === "string" ? e.data : "");
    });

    eventSource.addEventListener("notification", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as NotificationEventData;
      onNotification?.(data);
    });

    eventSource.onerror = () => {
      eventSource.close();
      eventSourceRef.current = null;
      setIsConnected(false);

      if (!enabledRef.current) return;
      if (reconnectAttemptRef.current >= MAX_RECONNECT_ATTEMPTS) return;

      reconnectAttemptRef.current += 1;
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectTimeoutRef.current = null;
        connect();
      }, reconnectDelayMs);
    };
  }, [disconnect, onConnect, onNotification, reconnectDelayMs, accessToken]);

  useEffect(() => {
    if (enabled) {
      reconnectAttemptRef.current = 0;
      connect();
    } else {
      disconnect();
    }
    return () => disconnect();
  }, [enabled, connect, disconnect]);

  return { isConnected, connect, disconnect };
}
