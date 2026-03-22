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
