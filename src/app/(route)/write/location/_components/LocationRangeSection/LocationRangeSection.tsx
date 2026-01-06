import { useState } from "react";
import { BottomSheet, KakaoMap } from "../_internal";

interface LocationRangeSectionProps {
  leaf: string | null;
}

const LocationRangeSection = ({ leaf }: LocationRangeSectionProps) => {
  const [radius, setRadius] = useState("3");

  return (
    <>
      <div className="w-full h-base">
        <KakaoMap />
      </div>

      <BottomSheet location={leaf} radius={radius} setRadius={setRadius} />
    </>
  );
};

export default LocationRangeSection;
