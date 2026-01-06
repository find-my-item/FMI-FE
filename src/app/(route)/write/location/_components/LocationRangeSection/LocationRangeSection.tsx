import { useState } from "react";
import { BottomSheet, KakaoMap } from "../_internal";

interface LocationRangeSectionProps {
  leaf: string | null;
}

const LocationRangeSection = ({ leaf }: LocationRangeSectionProps) => {
  const [radius, setRadius] = useState("3");

  return (
    <>
      {/* TODO(지권): height 수정 필요 */}
      <div className="h-[calc(100vh-350px)] w-full">
        <KakaoMap />
      </div>

      <BottomSheet location={leaf} radius={radius} setRadius={setRadius} />
    </>
  );
};

export default LocationRangeSection;
