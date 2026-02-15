"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { BOTTOM_OFFSET_PX, useBottomSheetHeight, MyLocationButton } from "./_internal";

interface BottomSheetProps {
  children: ReactNode;
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  const { height, isFullyExpanded, handlePointerDown, handlePointerUp } = useBottomSheetHeight();

  return (
    <motion.div
      style={{ height, bottom: `${BOTTOM_OFFSET_PX}px` }}
      className="fixed left-0 right-0 z-50 mx-auto max-w-[390px] select-none"
    >
      {!isFullyExpanded && <MyLocationButton />}
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
        <div className="min-h-0 flex-1 space-y-5 overflow-auto px-5 pb-[18px] no-scrollbar">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomSheet;
