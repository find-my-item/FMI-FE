import {
  BOTTOM_OFFSET_PX,
  HEADER_HEIGHT_PX,
  MIN_HEIGHT_PX,
  SNAP_RATIOS,
  INITIAL_HEIGHT_PX,
} from "./HEIGHT_PX";

export const getMaxHeightPx = () => {
  if (typeof window === "undefined") return INITIAL_HEIGHT_PX;
  return window.innerHeight - BOTTOM_OFFSET_PX - HEADER_HEIGHT_PX;
};

export const getSnapHeights = (max: number): number[] => {
  const range = max - MIN_HEIGHT_PX;
  return SNAP_RATIOS.map((r) =>
    r === 0 ? MIN_HEIGHT_PX : r === 1 ? max : MIN_HEIGHT_PX + range * r
  );
};
