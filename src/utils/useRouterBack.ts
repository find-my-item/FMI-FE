"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function useRouterBack(fallback: string = "/") {
  const router = useRouter();

  const canGoBack =
    typeof window !== "undefined" && (document.referrer !== "" || window.history.length > 1);

  const back = useCallback(() => {
    if (typeof window === "undefined") {
      router.replace(fallback);
      return;
    }

    const currentHost = window.location.host;

    const isInternalReferrer =
      document.referrer !== "" && new URL(document.referrer).host === currentHost;

    const hasHistory = window.history.length > 1 && isInternalReferrer;

    if (hasHistory) {
      router.back();
    } else {
      router.replace(fallback);
    }
  }, [router, fallback]);

  return { back, canGoBack };
}
