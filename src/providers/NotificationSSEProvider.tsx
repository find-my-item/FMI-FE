"use client";

import { PropsWithChildren, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { NotificationEventData, useNotificationSSE } from "@/api/fetch/notification";
import { useGetUsersMe } from "@/api/fetch/user";
import { getNotificationDisplayTitle } from "@/api/fetch/notification/utils/getNotificationDisplayTitle";
import { useSnackBar } from "@/context/SnackBarContext";

export const NotificationSSEProvider = ({
  children,
  accessToken,
}: PropsWithChildren<{ accessToken: string | undefined }>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: usersMeData } = useGetUsersMe();
  const { showSnackBar } = useSnackBar();

  const isLoggedIn = Boolean(usersMeData?.result);

  const onNotification = useCallback(
    ({ type, referenceType }: NotificationEventData) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      showSnackBar(getNotificationDisplayTitle(type, referenceType), "알림 페이지로 이동", () =>
        router.push("/alert")
      );
    },
    [queryClient, router, showSnackBar]
  );

  useNotificationSSE({
    enabled: isLoggedIn,
    onNotification,
    accessToken,
  });

  return children;
};
