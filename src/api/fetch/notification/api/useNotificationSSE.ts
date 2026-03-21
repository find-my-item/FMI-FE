"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { retryBackoffController } from "@/utils";
import type { NotificationEventData } from "../types/notificationSSETypes";

/** @see chatSocket.ts */
const RECONNECT_BASE_DELAY_MS = 1000;
const RECONNECT_MAX_DELAY_MS = 30000;
const RECONNECT_JITTER_RATIO = 0.2;

interface UseNotificationSSEOptions {
  enabled?: boolean;
  onConnect?: (message: string) => void;
  onNotification?: (data: NotificationEventData) => void;
}

interface UseNotificationSSEReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

type ConnectOptions = {
  force?: boolean;
};

const useNotificationSSE = ({
  enabled = true,
  onConnect,
  onNotification,
}: UseNotificationSSEOptions): UseNotificationSSEReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const enabledRef = useRef(enabled);
  const connectionVersionRef = useRef(0);

  const isReconnectingRef = useRef(false);

  const onConnectRef = useRef(onConnect);
  const onNotificationRef = useRef(onNotification);
  onConnectRef.current = onConnect;
  onNotificationRef.current = onNotification;

  const connectInternalRef = useRef<(opts?: ConnectOptions) => void>(() => {});

  const reconnectBackoffRef = useRef(
    retryBackoffController({
      baseDelayMs: RECONNECT_BASE_DELAY_MS,
      maxDelayMs: RECONNECT_MAX_DELAY_MS,
      jitterRatio: RECONNECT_JITTER_RATIO,
    })
  );

  const isSseErrorHandlingRef = useRef(false);

  enabledRef.current = enabled;

  const releaseEventSource = useCallback(() => {
    connectionVersionRef.current += 1;
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const disconnect = useCallback(() => {
    reconnectBackoffRef.current.cancel();
    reconnectBackoffRef.current.reset();
    isSseErrorHandlingRef.current = false;
    isReconnectingRef.current = false;
    releaseEventSource();
  }, [releaseEventSource]);

  const connectInternal = useCallback(
    (opts?: ConnectOptions) => {
      if (typeof window === "undefined") return;
      if (!enabledRef.current) return;

      const force = opts?.force === true;

      if (isReconnectingRef.current) return;

      if (!force && eventSourceRef.current?.readyState === EventSource.OPEN) {
        return;
      }

      isReconnectingRef.current = true;

      try {
        releaseEventSource();
        const connectionVersion = connectionVersionRef.current;

        const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
        if (!apiBase) return;

        const url = `${apiBase}/notifications/subscribe`;
        const eventSource = new EventSource(url, { withCredentials: true });

        if (connectionVersionRef.current !== connectionVersion) {
          eventSource.close();
          return;
        }

        eventSourceRef.current = eventSource;
        isSseErrorHandlingRef.current = false;

        eventSource.addEventListener("connect", (e: MessageEvent) => {
          if (
            connectionVersionRef.current !== connectionVersion ||
            eventSourceRef.current !== eventSource
          ) {
            return;
          }

          reconnectBackoffRef.current.reset();
          isSseErrorHandlingRef.current = false;
          setIsConnected(true);
          onConnectRef.current?.(typeof e.data === "string" ? e.data : "");
        });

        eventSource.addEventListener("notification", (e: MessageEvent) => {
          if (
            connectionVersionRef.current !== connectionVersion ||
            eventSourceRef.current !== eventSource
          ) {
            return;
          }

          const data = JSON.parse(e.data) as NotificationEventData;
          onNotificationRef.current?.(data);
        });

        eventSource.onerror = () => {
          if (
            connectionVersionRef.current !== connectionVersion ||
            eventSourceRef.current !== eventSource
          ) {
            return;
          }

          if (eventSource.readyState !== EventSource.CLOSED) {
            return;
          }

          if (isSseErrorHandlingRef.current) return;
          isSseErrorHandlingRef.current = true;

          eventSource.close();
          eventSourceRef.current = null;
          setIsConnected(false);

          if (!enabledRef.current) {
            isSseErrorHandlingRef.current = false;
            return;
          }

          reconnectBackoffRef.current.schedule(() => {
            connectInternalRef.current({ force: false });
            isSseErrorHandlingRef.current = false;
          }, {});
        };
      } finally {
        isReconnectingRef.current = false;
      }
    },
    [releaseEventSource]
  );

  connectInternalRef.current = connectInternal;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onTokenRefreshed = () => {
      if (!enabledRef.current) return;
      if (isReconnectingRef.current) return;

      reconnectBackoffRef.current.schedule(
        () => {
          connectInternalRef.current({ force: true });
        },
        { immediate: true, resetAttempt: true }
      );
    };

    window.addEventListener("tokenRefreshed", onTokenRefreshed);
    return () => window.removeEventListener("tokenRefreshed", onTokenRefreshed);
  }, []);

  useEffect(() => {
    if (enabled) {
      isSseErrorHandlingRef.current = false;
      reconnectBackoffRef.current.reset();
      connectInternalRef.current({ force: false });
    } else {
      disconnect();
    }

    return () => disconnect();
  }, [enabled, disconnect]);

  const connect = useCallback(() => {
    connectInternal({ force: true });
  }, [connectInternal]);

  return { isConnected, connect, disconnect };
};

export default useNotificationSSE;
