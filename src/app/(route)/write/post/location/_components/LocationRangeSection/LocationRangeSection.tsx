import { useState } from "react";
import { Radius } from "@/types";
import { BottomSheet, KakaoMap } from "../_internal";

interface LocationRangeSectionProps {
  location: string | null;
}

const LocationRangeSection = ({ location }: LocationRangeSectionProps) => {
  const [radius, setRadius] = useState<Radius>(3000);
  // TODO(지권): 목업 위도, 경도 수정 필요
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  return (
    <>
      <div className="h-[calc(100vh-350px)] w-full">
        <KakaoMap lat={lat ?? 35.8737787566279} lng={lng ?? 128.810871476804} radius={radius} />
      </div>

      <BottomSheet locationInfo={{ location, lat, lng }} radiusState={{ radius, setRadius }} />
    </>
  );
};

export default LocationRangeSection;
