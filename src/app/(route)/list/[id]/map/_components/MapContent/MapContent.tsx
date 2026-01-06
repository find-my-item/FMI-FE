"use client";

import { useSearchParams } from "next/navigation";
import { toNumber } from "../../_utils/toNumber";
import { DetailKakaoMap } from "../_internal";

const MapContent = () => {
  const searchParams = useSearchParams();

  let address = searchParams.get("address") || "서울특별시 중구 세종대로 110 서울특별시청";
  try {
    address = decodeURIComponent(address);
  } catch (error) {
    // noop
  }

  const rawData = {
    lat: toNumber(searchParams.get("lat"), 37.566370748),
    lng: toNumber(searchParams.get("lng"), 126.977918341),
    radius: toNumber(searchParams.get("radius"), 1000),
    address,
  };

  return (
    <section className="relative w-full h-base">
      <h2 className="sr-only">지도 영역</h2>
      <DetailKakaoMap data={rawData} />
    </section>
  );
};

export default MapContent;
