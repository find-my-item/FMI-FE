import { useMainKakaoMapStore } from "@/store";
import { useEffect } from "react";

const useMyLocationButton = () => {
  const { setLatLng, setUserGpsFromDevice, clearLatLng, triggerLevelReset } =
    useMainKakaoMapStore();

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
        const next = { lat: coords.latitude, lng: coords.longitude };
        setUserGpsFromDevice(next);
        setLatLng(next);
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
