"use client";

import { useEffect, useState } from "react";
import { BaseKakaoMap } from "@/components/domain";
import { useMainKakaoMapStore } from "@/store";
import { DEFAULT_LAT_LNG } from "@/constants";

const MainKakaoMap = () => {
  const { latLng, setLatLng, clearLatLng, levelResetSignal } = useMainKakaoMapStore();
  const [isPermissionResolved, setIsPermissionResolved] = useState(false);
  const [mapCenter, setMapCenter] = useState(DEFAULT_LAT_LNG);
  const [mapLevel, setMapLevel] = useState(6);

  useEffect(() => {
    const syncCenterByPermission = async () => {
      if (!navigator.permissions) {
        clearLatLng();
        setMapCenter(DEFAULT_LAT_LNG);
        setIsPermissionResolved(true);
        return;
      }

      const permission = await navigator.permissions.query({ name: "geolocation" });
      const isLocationGranted = permission.state === "granted";

      if (!isLocationGranted) {
        clearLatLng();
        setMapCenter(DEFAULT_LAT_LNG);
        setIsPermissionResolved(true);
        return;
      }

      setIsPermissionResolved(true);
    };

    void syncCenterByPermission();
  }, [clearLatLng]);

  useEffect(() => {
    if (!isPermissionResolved) return;
    setMapCenter(latLng);
  }, [latLng, isPermissionResolved]);

  useEffect(() => {
    setMapLevel((prevLevel) => Math.min(prevLevel, 6));
  }, [levelResetSignal]);

  if (!isPermissionResolved) return null;

  return (
    <BaseKakaoMap
      center={mapCenter}
      level={mapLevel}
      showMarker
      draggable
      onLevelChange={(nextLevel) => {
        setMapLevel(nextLevel);
      }}
      onDragEnd={(nextCenter) => {
        setLatLng(nextCenter);
      }}
    />
  );
};

export default MainKakaoMap;
