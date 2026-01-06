"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ["services"],
  });

  if (loading) return null;
  if (error) return <div>로드 실패</div>;

  return (
    <Map
      center={{ lat: 35.8737787566279, lng: 128.810871476804 }}
      level={3}
      style={{ width: "100%", height: "100%" }}
    ></Map>
  );
}
