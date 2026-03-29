"use client";

import { useEffect, useState } from "react";

/**
 * Geolocation 권한 상태를 구독해 `granted` 여부를 반환합니다.
 *
 * @author hyungjun
 * @description
 * - 브라우저 `Permissions API`의 `geolocation` 권한을 조회합니다.
 * - 권한 상태 변경 이벤트(`change`)를 구독해 상태를 동기화합니다.
 * - 서버 환경 또는 `Permissions API` 미지원 환경에서는 `false`를 반환합니다.
 *
 * @returns 현재 Geolocation 권한 허용 여부
 *
 * @example
 * ```ts
 * const isLocationGranted = useGeolocationPermissionGranted();
 * // => true | false
 * ```
 */
export const useGeolocationPermissionGranted = () => {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    let cancelled = false;
    let permRef: PermissionStatus | null = null;
    const sync = () => {
      if (cancelled) return;
      setGranted(permRef?.state === "granted");
    };

    if (!navigator.permissions) {
      setGranted(false);
      return;
    }

    void navigator.permissions.query({ name: "geolocation" }).then((p) => {
      if (cancelled) return;
      permRef = p;
      sync();
      p.addEventListener("change", sync);
    });

    return () => {
      cancelled = true;
      permRef?.removeEventListener("change", sync);
    };
  }, []);

  return granted;
};
