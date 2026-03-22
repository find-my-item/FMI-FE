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
import { useSnackBar } from "@/context/SnackBarContext";
import { useAuthStore } from "@/store";

const isAuthRoutePath = (pathname: string) =>
  pathname.startsWith("/login") || pathname.startsWith("/sign-up");

const NOTIFICATION_BATCH_DEBOUNCE_MS = 500;

// TODO(형준): SSE 재연결 시 알림 오지않는 문제, 미확인 알림 전역 변수 추가 필요, 알림 디자인/API 달라서 누락 있음, 알림 리스트 중 채팅 클릭 시 채팅 API 실패하는 문제

export const NotificationSSEProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

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
    [pathname, debouncedFlush]
  );

  useNotificationSSE({
    enabled: isAuthInitialized,
    onNotification,
  });

  return children;
};
