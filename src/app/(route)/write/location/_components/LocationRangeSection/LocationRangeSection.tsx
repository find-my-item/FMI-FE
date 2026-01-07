import { useState } from "react";
import { Radius } from "@/types";
import { BottomSheet, KakaoMap } from "../_internal";

interface LocationRangeSectionProps {
  location: string | null;
}

const LocationRangeSection = ({ location }: LocationRangeSectionProps) => {
  const [radius, setRadius] = useState<Radius>(3000);

  return (
    <>
      {/* TODO(지권): height 수정 필요 */}
      <div className="h-[calc(100vh-350px)] w-full">
        <KakaoMap lat={35.8737787566279} lng={128.810871476804} radius={radius} />
      </div>

      <BottomSheet location={location} radius={radius} setRadius={setRadius} />
    </>
  );
};

export default LocationRangeSection;
