"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApiRefreshToken } from "@/api/fetch/auth";
import { useAuthStore } from "@/store";

export default function AuthBootstrap() {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: refreshTokenMutate } = useApiRefreshToken();
  const ranRef = useRef(false);

  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  useEffect(() => {
    if (pathname === "/login?reason=session-expired") {
      setAuthInitialized(true);
      return;
    }

    if (ranRef.current) return;
    ranRef.current = true;

    refreshTokenMutate(undefined, {
      onSuccess: (data) => {
        if (data?.result?.temporaryPassword) {
          router.replace("/change-password?reason=temporary-password");
        }
      },
      onError: (error) => {
        if (error.code === "AUTH401-INVALID_REFRESH") router.push("/login?reason=session-expired");
      },
      onSettled: () => {
        setAuthInitialized(true);
      },
    });
  }, [refreshTokenMutate, router, pathname, setAuthInitialized]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentCount = parseInt(sessionStorage.getItem("__fmi_history_count") || "0", 10);
      if (currentCount < 2) {
        sessionStorage.setItem("__fmi_history_count", (currentCount + 1).toString());
      }
    }
  }, [pathname]);

  return null;
}
