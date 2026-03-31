"use client";

import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { debounce } from "lodash";
import {
  NotificationEventData,
  NOTIFICATION_TYPE,
  REFERENCE_TYPE,
  useNotificationSSE,
} from "@/api/fetch/notification";
import { useFaviconNotification } from "@/hooks";
import { useSnackBar } from "@/context/SnackBarContext";
import { useAuthStore, useNotificationStore } from "@/store";
import { AUTH_LOGIN_SUCCESS_EVENT } from "@/constants";

const isAuthRoutePath = (pathname: string) =>
  pathname.startsWith("/login") || pathname.startsWith("/sign-up");

const NOTIFICATION_BATCH_DEBOUNCE_MS = 500;

export const NotificationSSEProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  const hasUnreadNotification = useNotificationStore((state) => state.hasUnreadNotification);
  const setHasUnreadNotification = useNotificationStore((state) => state.setHasUnreadNotification);

  useFaviconNotification(hasUnreadNotification);
  const addUnreadNotificationType = useNotificationStore(
    (state) => state.addUnreadNotificationType
  );

  const bufferedKeysRef = useRef<
    {
      type: NotificationEventData["type"];
      referenceType: NotificationEventData["referenceType"];
      title: string;
    }[]
  >([]);

  const debouncedFlush = useMemo(
    () =>
      debounce(() => {
        const buffered = bufferedKeysRef.current;
        bufferedKeysRef.current = [];
        if (buffered.length === 0) return;

        queryClient.invalidateQueries({ queryKey: ["notificationList"] });

        const title =
          buffered.length === 1 ? buffered[0].title : `새 알림 ${buffered.length}건이 도착했어요`;

        showSnackBar(title, "알림 페이지로 이동", () => router.push("/alert"));
      }, NOTIFICATION_BATCH_DEBOUNCE_MS),
    [queryClient, router, showSnackBar]
  );

  useEffect(() => {
    return () => {
      debouncedFlush.cancel();
    };
  }, [debouncedFlush]);

  const onNotification = useCallback(
    ({ type, referenceType, title }: NotificationEventData) => {
      setHasUnreadNotification(true);
      addUnreadNotificationType(type);

      if (isAuthRoutePath(pathname)) {
        return;
      }

      const isChatPage = pathname.startsWith("/chat");
      const isChatNotification =
        type === NOTIFICATION_TYPE.CHAT ||
        type === NOTIFICATION_TYPE.CHAT_REMINDER ||
        referenceType === REFERENCE_TYPE.CHAT;

      if (isChatPage && isChatNotification) {
        return;
      }

      bufferedKeysRef.current.push({
        type,
        referenceType,
        title,
      });

      debouncedFlush();
    },
    [pathname, debouncedFlush, setHasUnreadNotification, addUnreadNotificationType]
  );

  const prevPathnameRef = useRef(pathname);
  const didMoveFromAuthRouteRef = useRef(false);
  const didLoginSuccessEventRef = useRef(false);

  const { connect } = useNotificationSSE({
    enabled: isAuthInitialized,
    onNotification,
  });

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    const didMove = isAuthRoutePath(prevPathname) && !isAuthRoutePath(pathname);

    if (didMove) {
      didMoveFromAuthRouteRef.current = true;
    }

    if (isAuthInitialized && didMoveFromAuthRouteRef.current) {
      connect();
      didMoveFromAuthRouteRef.current = false;
    }

    prevPathnameRef.current = pathname;
  }, [pathname, isAuthInitialized, connect]);

  useEffect(() => {
    const handleLoginSuccess = () => {
      didLoginSuccessEventRef.current = true;

      if (isAuthInitialized) {
        connect();
        didLoginSuccessEventRef.current = false;
      }
    };

    window.addEventListener(AUTH_LOGIN_SUCCESS_EVENT, handleLoginSuccess);
    return () => {
      window.removeEventListener(AUTH_LOGIN_SUCCESS_EVENT, handleLoginSuccess);
    };
  }, [connect, isAuthInitialized]);

  useEffect(() => {
    if (!isAuthInitialized || !didLoginSuccessEventRef.current) return;

    connect();
    didLoginSuccessEventRef.current = false;
  }, [isAuthInitialized, connect]);

  return children;
};
