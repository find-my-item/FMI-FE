import { useMainKakaoMapStore } from "@/store";
import { useEffect } from "react";

const useMyLocationButton = () => {
  const { setLatLng, clearLatLng, triggerLevelReset } = useMainKakaoMapStore();

  useEffect(() => {
    const checkGeolocationPermission = async () => {
      if (!navigator.geolocation) {
        clearLatLng();
        return;
      }

      if (!navigator.permissions) return;

      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        clearLatLng();
      }
    };

    void checkGeolocationPermission();
  }, [clearLatLng]);

  const handleMyLocationClick = () => {
    if (!navigator.geolocation) {
      clearLatLng();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        triggerLevelReset();
        setLatLng({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      () => {
        triggerLevelReset();
        clearLatLng();
      }
    );
  };

  return {
    handleMyLocationClick,
  };
};

export default useMyLocationButton;
