"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NotificationEventData } from "../types/notificationSSETypes";
import {
  connectNotificationSSE,
  disconnectNotificationSSE,
  setNotificationSSEHandlers,
} from "./notificationSSEClient";

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

/**
 * SSE는 `notificationSSEClient` 싱글톤으로만 연결한다.
 * 핸들러는 ref로 최신 콜백을 참조하고, 등록은 마운트 시 한 번만 한다.
 */
const useNotificationSSE = ({
  enabled = true,
  onConnect,
  onNotification,
}: UseNotificationSSEOptions): UseNotificationSSEReturn => {
  const [isConnected, setIsConnected] = useState(false);

  const onConnectRef = useRef(onConnect);
  const onNotificationRef = useRef(onNotification);
  onConnectRef.current = onConnect;
  onNotificationRef.current = onNotification;

  useEffect(() => {
    setNotificationSSEHandlers({
      onConnect: (message) => onConnectRef.current?.(message),
      onNotification: (data) => onNotificationRef.current?.(data),
      onConnectionState: setIsConnected,
    });
    return () => {
      setNotificationSSEHandlers({
        onConnect: undefined,
        onNotification: undefined,
        onConnectionState: undefined,
      });
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      void connectNotificationSSE({ force: false });
    } else {
      disconnectNotificationSSE();
    }
  }, [enabled]);

  const connect = useCallback(() => {
    void connectNotificationSSE({ force: true });
  }, []);

  const disconnect = useCallback(() => {
    disconnectNotificationSSE();
  }, []);

  return { isConnected, connect, disconnect };
};

export default useNotificationSSE;
