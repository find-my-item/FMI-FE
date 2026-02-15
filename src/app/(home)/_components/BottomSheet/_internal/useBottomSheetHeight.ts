"use client";

import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { INITIAL_HEIGHT_PX, MIN_HEIGHT_PX } from "./HEIGHT_PX";
import { getMaxHeightPx, getSnapHeights } from "./heightUtils";
import { useSearchParams } from "next/navigation";

const FULLY_EXPANDED_TOLERANCE_PX = 2;

interface PointerHandlerEvent {
  currentTarget: EventTarget & HTMLElement;
  pointerId: number;
  clientY: number;
}

const useBottomSheetHeight = () => {
  const [snapHeights, setSnapHeights] = useState<number[]>([]);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const height = useMotionValue(INITIAL_HEIGHT_PX);
  const moveListenerRef = useRef<((e: PointerEvent) => void) | null>(null);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");

  useMotionValueEvent(height, "change", (latest: number) => {
    const max = getMaxHeightPx();
    setIsFullyExpanded(latest >= max - FULLY_EXPANDED_TOLERANCE_PX);
  });

  useEffect(() => {
    if (searchValue) {
      height.set(getMaxHeightPx());
      return;
    }
    height.set(INITIAL_HEIGHT_PX);
  }, [searchValue]);

  useEffect(() => {
    const max = getMaxHeightPx();
    const points = getSnapHeights(max);
    setSnapHeights(points);
    height.set(points[2]); // 초기: 50% 지점
  }, [height]);

  useEffect(() => {
    const onResize = () => {
      const max = getMaxHeightPx();
      setSnapHeights(getSnapHeights(max));
      height.set(Math.min(height.get(), max));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [height]);

  const snapToClosestHeight = (currentHeight: number) => {
    if (!snapHeights.length) return;

    const closest = snapHeights.reduce((prev, curr) =>
      Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev
    );

    animate(height, closest, {
      type: "spring",
      stiffness: 300,
      damping: 35,
    });
  };

  const handlePointerDown = (e: PointerHandlerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const startY = e.clientY;
    const startHeight = height.get();

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta = startY - moveEvent.clientY;
      const maxH = getMaxHeightPx();
      const newHeight = Math.min(maxH, Math.max(MIN_HEIGHT_PX, startHeight + delta));
      height.set(newHeight);
    };

    moveListenerRef.current = onPointerMove;
    document.addEventListener("pointermove", onPointerMove);
  };

  const handlePointerUp = (e: PointerHandlerEvent) => {
    const currentHeight = height.get();
    snapToClosestHeight(currentHeight);
    e.currentTarget.releasePointerCapture(e.pointerId);
    const listener = moveListenerRef.current;
    if (listener) {
      document.removeEventListener("pointermove", listener);
      moveListenerRef.current = null;
    }
  };

  return { height, isFullyExpanded, handlePointerDown, handlePointerUp };
};

export default useBottomSheetHeight;
