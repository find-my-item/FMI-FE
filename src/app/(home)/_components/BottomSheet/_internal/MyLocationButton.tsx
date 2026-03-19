"use client";

import { useEffect } from "react";
import { Icon } from "@/components/common";
import { useMainKakaoMapStore } from "@/utils/store/store";

interface MyLocationButtonProps {
  isFullyExpanded: boolean;
}

const MyLocationButton = ({ isFullyExpanded }: MyLocationButtonProps) => {
  if (isFullyExpanded) return null;

  const { setLatLng, clearLatLng } = useMainKakaoMapStore();

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

  const handleClick = () => {
    if (!navigator.geolocation) {
      clearLatLng();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLatLng({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      () => {
        clearLatLng();
      }
    );
  };

  return (
    <button
      aria-label="내 위치로 이동"
      onClick={handleClick}
      className="absolute right-3 flex h-[38px] w-[38px] rounded-full bg-white shadow-lg flex-center"
      style={{ bottom: `calc(100% + 12px)` }}
    >
      <Icon name="MapMyLocation" size={20} />
    </button>
  );
};

export default MyLocationButton;
