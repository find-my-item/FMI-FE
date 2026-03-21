"use client";

import { BaseKakaoMap } from "@/components/domain";
import useMainKakaoMap from "../../_hooks/useMainKakaoMap";
import { useGetMarker } from "@/api/fetch/mapController";

const MainKakaoMap = () => {
  const { mapCenter, mapLevel, isPermissionResolved, setMapLevel, setLatLng } = useMainKakaoMap();
  const { data: markerData } = useGetMarker();

  if (!isPermissionResolved) return null;

  // MapMarker 클릭 시 바텀 시트 반 올라오고, 바텀 시트 내부에서 지도 게시글 카드 리스트 조회 결과 렌더링
  // 지도 게시글 카드 리스트 조회 API에 무한 스크롤 추가되어야 함 백엔드 지연

  return (
    <BaseKakaoMap
      center={mapCenter}
      level={mapLevel}
      showMarker
      draggable
      onLevelChange={(nextLevel) => setMapLevel(nextLevel)}
      onDragEnd={(nextCenter) => setLatLng(nextCenter)}
      markerData={markerData?.result}
    />
  );
};

export default MainKakaoMap;
