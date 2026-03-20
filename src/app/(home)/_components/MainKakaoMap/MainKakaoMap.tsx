"use client";

import { BaseKakaoMap } from "@/components/domain";
import useMainKakaoMap from "../../_hooks/useMainKakaoMap";

const MainKakaoMap = () => {
  const { mapCenter, mapLevel, isPermissionResolved, setMapLevel, setLatLng } = useMainKakaoMap();

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
