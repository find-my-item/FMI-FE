import { DEFAULT_LAT_LNG } from "@/constants";
import { useMainKakaoMapStore } from "@/store";
import { useEffect, useRef, useState } from "react";

const useMainKakaoMap = () => {
  const { latLng, setLatLng, clearLatLng, levelResetSignal, mapLevel, setMapLevel } =
    useMainKakaoMapStore();
  const [isPermissionResolved, setIsPermissionResolved] = useState(false);
  const [mapCenter, setMapCenter] = useState(DEFAULT_LAT_LNG);
  const mapLevelRef = useRef(mapLevel);

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
    mapLevelRef.current = mapLevel;
  }, [mapLevel]);

  useEffect(() => {
    setMapLevel(Math.min(mapLevelRef.current, 6));
  }, [levelResetSignal, setMapLevel]);

  return {
    mapCenter,
    mapLevel,
    setMapLevel,
    setLatLng,
    isPermissionResolved,
  };
};

export default useMainKakaoMap;
