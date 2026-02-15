"use client";

import { motion } from "framer-motion";
import { BOTTOM_OFFSET_PX, useBottomSheetHeight, MyLocationButton } from "./_internal";
import { useSearchParams } from "next/navigation";
import DefaultSheetContent from "../DefaultSheetContent/DefaultSheetContent";
import PostSheetContent from "../PostSheetContent/PostSheetContent";

const BottomSheet = () => {
  const { height, isFullyExpanded, handlePointerDown, handlePointerUp } = useBottomSheetHeight();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");

  return (
    <motion.div
      style={{ height, bottom: `${BOTTOM_OFFSET_PX}px` }}
      className="fixed left-0 right-0 z-50 mx-auto max-w-[390px] select-none"
    >
      <MyLocationButton isFullyExpanded={isFullyExpanded} />
      <div className="flex h-full flex-col overflow-hidden rounded-t-[20px] bg-white">
        <div
          role="button"
          aria-label="바텀시트 높이 조절"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex shrink-0 cursor-grab touch-none justify-center pb-5 pt-3"
        >
          <div className="h-[3px] w-[50px] rounded-full bg-[#2D2D2D]" />
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 pb-[18px] no-scrollbar">
          {searchValue ? <PostSheetContent /> : <DefaultSheetContent />}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomSheet;
