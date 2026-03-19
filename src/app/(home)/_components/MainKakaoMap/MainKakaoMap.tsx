"use client";

import { useEffect, useState } from "react";
import { BaseKakaoMap } from "@/components/domain";
import { useMainKakaoMapStore } from "@/utils/store/store";
import { DEFAULT_LAT_LNG } from "@/constants";

const MainKakaoMap = () => {
  const { latLng, setLatLng, clearLatLng } = useMainKakaoMapStore();
  const [isPermissionResolved, setIsPermissionResolved] = useState(false);
  const [mapCenter, setMapCenter] = useState(DEFAULT_LAT_LNG);

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

  if (!isPermissionResolved) return null;

  return (
    <BaseKakaoMap
      center={mapCenter}
      showMarker
      draggable
      onDragEnd={(nextCenter) => {
        setLatLng(nextCenter);
      }}
    />
  );
};

export default MainKakaoMap;
