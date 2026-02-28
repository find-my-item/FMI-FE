"use client";

import { useState } from "react";
import { Radius } from "@/types";
import { BottomSheet, PostWriteKakaoMap } from "../_internal";

interface LocationRangeSectionProps {
  address: string | null;
  fullAddress: string | null;
  initialLat?: number;
  initialLng?: number;
}

const LocationRangeSection = ({
  address,
  fullAddress,
  initialLat,
  initialLng,
}: LocationRangeSectionProps) => {
  const [radius, setRadius] = useState<Radius>(3000);

  const lat = initialLat ?? 37.566370748;
  const lng = initialLng ?? 126.977918341;

  return (
    <>
      <div className="h-[calc(100vh-350px)] w-full">
        <PostWriteKakaoMap lat={lat} lng={lng} radius={radius} />
      </div>

      <BottomSheet
        locationInfo={{ address, fullAddress, lat, lng }}
        radiusState={{ radius, setRadius }}
      />
    </>
  );
};

export default LocationRangeSection;
