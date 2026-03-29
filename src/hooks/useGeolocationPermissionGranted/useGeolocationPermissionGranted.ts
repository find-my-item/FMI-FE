"use client";

import { useEffect, useState } from "react";

/** `navigator.permissions` 기준 geolocation === granted */
export function useGeolocationPermissionGranted() {
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
}
