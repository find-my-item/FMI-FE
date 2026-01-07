"use client";

import { Radius } from "@/types";
import { getMapLevelByRadius } from "@/utils";
import { useState } from "react";
import { Circle, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface WriteKakaoMap {
  lat: number;
  lng: number;
  radius: Radius;
}

const WriteKakaoMap = ({ lat, lng, radius }: WriteKakaoMap) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ["services"],
  });

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat,
    lng,
  });

  if (loading) return null;
  if (error) return <div>로드 실패</div>;

  const handleMapDragEnd = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();

    setCenter({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
  };

  const level = getMapLevelByRadius(radius);

  return (
    <>
      <Map
        center={center}
        level={level}
        style={{ width: "100%", height: "100%" }}
        onDragEnd={handleMapDragEnd}
      >
        <MapMarker
          position={center}
          image={{
            src: "/kakao-map/marker.svg",
            size: { width: 26, height: 37 },
            options: { offset: { x: 13, y: 20 } },
          }}
        />
        <Circle
          center={center}
          radius={radius}
          strokeColor="#1EB87B"
          strokeWeight={1}
          fillColor="#1EB87B"
          fillOpacity={0.15}
        />
      </Map>
    </>
  );
};

export default WriteKakaoMap;
