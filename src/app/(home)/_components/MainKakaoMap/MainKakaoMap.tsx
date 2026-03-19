"use client";

import { BaseKakaoMap } from "@/components/domain";

const MainKakaoMap = () => {
  return <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker draggable />;
};

export default MainKakaoMap;
