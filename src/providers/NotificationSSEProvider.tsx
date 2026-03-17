"use client";

import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import authApi from "@/api/_base/axios/authApi";
import {
  NotificationEventData,
  NOTIFICATION_TYPE,
  REFERENCE_TYPE,
  useNotificationSSE,
} from "@/api/fetch/notification";
import { getNotificationDisplayTitle } from "@/api/fetch/notification/utils/getNotificationDisplayTitle";
import { useSnackBar } from "@/context/SnackBarContext";
import { useAuthStore } from "@/store";

const ACCESS_TOKEN_API_PATH = "/api/auth/access-token";

export const NotificationSSEProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  const getAccessToken = useCallback(async () => {
    const response = await fetch(ACCESS_TOKEN_API_PATH, { cache: "no-store" });

    if (!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as { accessToken: string | null };
    return data.accessToken ?? undefined;
  }, []);

  const syncAccessTokenState = useCallback(async () => {
    const accessToken = await getAccessToken();
    const hasToken = Boolean(accessToken);

    setHasAccessToken(hasToken);
    return hasToken;
  }, [getAccessToken]);

  useEffect(() => {
    if (!isAuthInitialized) {
      setHasAccessToken(false);
      return;
    }

    void syncAccessTokenState();
  }, [isAuthInitialized, pathname, syncAccessTokenState]);

  const refreshAccessToken = useCallback(async () => {
    try {
      await authApi.post("/auth/refresh");
      return await syncAccessTokenState();
    } catch {
      setHasAccessToken(false);
      return false;
    }
  }, [syncAccessTokenState]);

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
    enabled: isAuthInitialized && hasAccessToken,
    onNotification,
    getAccessToken,
    refreshAccessToken,
  });

  return children;
};
