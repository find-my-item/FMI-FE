"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ latitude, longitude }: KakaoMapProps) => {
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "100%" }}
      level={7}
    >
      <MapMarker
        position={{ lat: latitude, lng: longitude }}
        image={{
          src: "/kakao-map/marker.svg",
          size: { width: 26, height: 30 },
          options: { offset: { x: 13, y: 15 } },
        }}
      />
    </Map>
  );
};

export default KakaoMap;
