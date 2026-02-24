"use client";

import { motion } from "framer-motion";
import { Suspense, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { DefaultSheetContentHeights } from "./_internal";
import { BOTTOM_OFFSET_PX, useBottomSheetHeight, MyLocationButton } from "./_internal";
import DefaultSheetContent from "../DefaultSheetContent/DefaultSheetContent";
import PostSheetContent from "../PostSheetContent/PostSheetContent";

const BottomSheetContent = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const [contentHeights, setContentHeights] = useState<DefaultSheetContentHeights | null>(null);
  const { height, isFullyExpanded, handlePointerDown, handlePointerUp } =
    useBottomSheetHeight(contentHeights);

  const handleSectionHeights = useCallback((heights: DefaultSheetContentHeights) => {
    setContentHeights(heights);
  }, []);

  return (
    <motion.div
      style={{ height, bottom: `${BOTTOM_OFFSET_PX}px` }}
      className="fixed left-0 right-0 z-50 mx-auto max-w-[768px] select-none"
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
          {/* TODO(형준): 토큰 업데이트 후 반영 예정(#2D2D2D) */}
          <div className="h-[3px] w-[50px] rounded-full bg-[#2D2D2D]" />
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 pb-[18px] no-scrollbar">
          {searchValue ? (
            <PostSheetContent />
          ) : (
            <DefaultSheetContent onSectionHeights={handleSectionHeights} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BottomSheet = () => {
  return (
    <Suspense fallback="">
      <BottomSheetContent />
    </Suspense>
  );
};

export default BottomSheet;
