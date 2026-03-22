"use client";

import { useMap } from "react-kakao-maps-sdk";
import { useEffect, useRef } from "react";

export type LatLngPoint = { lat: number; lng: number };

export interface MapCameraSyncProps {
  /** 0이면 동작하지 않습니다. 값을 올릴 때마다 `target`으로 `map.setCenter` 후 idle에서 동기화합니다. */
  requestId: number;
  target: LatLngPoint;
  onIdleSync?: (center: LatLngPoint, level: number) => void;
  /** `map.setLevel(Math.min(level, maxLevel))` — 단일 마커 이동 시 줌 상한 */
  maxLevel?: number;
}

/**
 * `Map`의 자식에서만 사용(`useMap`). 카카오 `setCenter` + `setLevel`로 카메라만 조작합니다.
 */
const MapCameraSync = ({ requestId, target, onIdleSync, maxLevel = 6 }: MapCameraSyncProps) => {
  const map = useMap();
  const onIdleSyncRef = useRef(onIdleSync);
  const targetRef = useRef(target);
  onIdleSyncRef.current = onIdleSync;
  targetRef.current = target;

  useEffect(() => {
    if (!requestId || !map) return;

    const t = targetRef.current;
    let cancelled = false;

    map.setCenter(new kakao.maps.LatLng(t.lat, t.lng));
    map.setLevel(Math.min(map.getLevel(), maxLevel));

    const handleIdle = () => {
      if (cancelled) return;
      kakao.maps.event.removeListener(map, "idle", handleIdle);
      const c = map.getCenter();
      onIdleSyncRef.current?.({ lat: c.getLat(), lng: c.getLng() }, map.getLevel());
    };

    kakao.maps.event.addListener(map, "idle", handleIdle);

    return () => {
      cancelled = true;
      kakao.maps.event.removeListener(map, "idle", handleIdle);
    };
  }, [requestId, map, maxLevel]);

  return null;
};

export default MapCameraSync;
