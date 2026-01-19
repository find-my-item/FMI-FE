"use client";

import { useState } from "react";
import { Radius } from "@/types";
import { BottomSheet, KakaoMap } from "../_internal";

interface LocationRangeSectionProps {
  address: string | null;
  fullAddress: string | null;
}

const LocationRangeSection = ({ address, fullAddress }: LocationRangeSectionProps) => {
  const [radius, setRadius] = useState<Radius>(3000);
  // TODO(지권): 목업 위도, 경도 수정 필요
  const [lat, setLat] = useState(35.8737787566279);
  const [lng, setLng] = useState(128.810871476804);

  return (
    <>
      <div className="h-[calc(100vh-350px)] w-full">
        <KakaoMap lat={lat} lng={lng} radius={radius} />
      </div>

      <BottomSheet
        locationInfo={{ address, fullAddress, lat, lng }}
        radiusState={{ radius, setRadius }}
      />
    </>
  );
};

export default LocationRangeSection;
