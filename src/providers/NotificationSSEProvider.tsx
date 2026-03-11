"use client";

import { PropsWithChildren, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUsersMe } from "@/api/fetch/user";
import { useNotificationSSE } from "@/api/fetch/notification";
import { useToast } from "@/context/ToastContext";

/**
 * 로그인 사용자에 대해 알림 SSE를 구독하고,
 * 새 알림 시 알림 목록 쿼리 무효화 및 토스트 표시
 */
export function NotificationSSEProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { data: usersMeData } = useGetUsersMe();
  const { addToast } = useToast();

  const isLoggedIn = Boolean(usersMeData?.result);

  // const onNotification = useCallback(
  //   (notification: { title: string; message: string }) => {
  //     queryClient.invalidateQueries({ queryKey: ["notifications"] });
  //     addToast(notification.title || notification.message, "success");
  //   },
  //   [queryClient, addToast]
  // );

  // useNotificationSSE({
  //   enabled: isLoggedIn,
  //   onNotification,
  // });

  return <>{children}</>;
}
