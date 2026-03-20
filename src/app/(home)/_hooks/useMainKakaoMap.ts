import { DEFAULT_LAT_LNG } from "@/constants";
import { useMainKakaoMapStore } from "@/store";
import { useEffect, useState } from "react";

const useMainKakaoMap = () => {
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

  return {
    mapCenter,
    mapLevel,
    setMapLevel,
    setLatLng,
    isPermissionResolved,
  };
};

export default useMainKakaoMap;
