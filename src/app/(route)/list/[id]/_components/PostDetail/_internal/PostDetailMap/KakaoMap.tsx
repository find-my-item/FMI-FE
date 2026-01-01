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
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default KakaoMap;
