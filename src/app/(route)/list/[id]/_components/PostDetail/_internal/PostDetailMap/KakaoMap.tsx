"use client";

import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ latitude, longitude }: KakaoMapProps) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY as string,
    libraries: ["services"],
  });

  // TODO(지권): 로딩/에러 로직 개선
  if (loading) return <div>지도 로딩중</div>;
  if (error) return <div>지도 로드 실패</div>;

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
