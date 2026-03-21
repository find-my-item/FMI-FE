"use client";

import { PropsWithChildren, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import {
  NotificationEventData,
  NOTIFICATION_TYPE,
  REFERENCE_TYPE,
  useNotificationSSE,
} from "@/api/fetch/notification";
import { getNotificationDisplayTitle } from "@/api/fetch/notification/utils/getNotificationDisplayTitle";
import { useSnackBar } from "@/context/SnackBarContext";
import { useAuthStore } from "@/store";

/** 로그인·회원가입 화면에서는 SSE 불필요(세션 없음/곧 이동) + 불필요한 연결 시도 방지 */
const isAuthRoutePath = (pathname: string) =>
  pathname.startsWith("/login") || pathname.startsWith("/sign-up");

// TODO(형준): SSE 재연결 시 알림 오지않는 문제, 미확인 알림 전역 변수 추가 필요, 알림 디자인/API 달라서 누락 있음, 알림 리스트 중 채팅 클릭 시 채팅 API 실패하는 문제

export const NotificationSSEProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const onNotification = useCallback(
    ({ type, referenceType }: NotificationEventData) => {
      const isChatPage = pathname.startsWith("/chat");
      const isChatNotification =
        type === NOTIFICATION_TYPE.CHAT ||
        type === NOTIFICATION_TYPE.CHAT_REMINDER ||
        referenceType === REFERENCE_TYPE.CHAT;

      if (isChatPage && isChatNotification) {
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["notificationList"] });
      showSnackBar(
        getNotificationDisplayTitle(type, referenceType).replace(/"/g, ""),
        "알림 페이지로 이동",
        () => router.push("/alert")
      );
    },
    [pathname, queryClient, router, showSnackBar]
  );

  useNotificationSSE({
    enabled: isAuthInitialized && !isAuthRoutePath(pathname),
    onNotification,
  });

  return children;
};
