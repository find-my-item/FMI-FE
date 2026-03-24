"use client";

import { Icon } from "@/components/common";
import useMyLocationButton from "../../_hooks/useMyLocationButton";

interface MyLocationButtonProps {
  isFullyExpanded: boolean;
}

const MyLocationButton = ({ isFullyExpanded }: MyLocationButtonProps) => {
  if (isFullyExpanded) return null;

  const { handleMyLocationClick } = useMyLocationButton();

  return (
    <button
      aria-label="내 위치로 이동"
      onClick={handleMyLocationClick}
      className="flex h-[38px] w-[38px] rounded-full bg-white shadow-lg flex-center"
      // TODO: 베타 테스트 종료 후 제거
      // className="absolute right-3 flex h-[38px] w-[38px] rounded-full bg-white shadow-lg flex-center"
      style={{ bottom: `calc(100% + 12px)` }}
    >
      <Icon name="MapMyLocation" size={20} />
    </button>
  );
};

export default MyLocationButton;
