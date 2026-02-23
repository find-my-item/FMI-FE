import {
  BOTTOM_OFFSET_PX,
  HEADER_HEIGHT_PX,
  MIN_HEIGHT_PX,
  SNAP_RATIOS,
  INITIAL_HEIGHT_PX,
  SHEET_HANDLE_HEIGHT_PX,
  SHEET_CONTENT_BOTTOM_PADDING_PX,
} from "./HEIGHT_PX";

export const getMaxHeightPx = () => {
  if (typeof window === "undefined") return INITIAL_HEIGHT_PX;
  return window.innerHeight - BOTTOM_OFFSET_PX - HEADER_HEIGHT_PX;
};

export interface DefaultSheetContentHeights {
  upToLostFindActions: number;
  upToRecentFoundItemSection: number;
  upToPoliceSection: number;
}

export const getSnapHeightsByDevice = (max: number): number[] => {
  const range = max - MIN_HEIGHT_PX;
  return SNAP_RATIOS.map((r) =>
    r === 0 ? MIN_HEIGHT_PX : r === 1 ? max : MIN_HEIGHT_PX + range * r
  );
};

const CONTENT_SNAP_OFFSET_PX = 40;

export const getSnapHeightsByContent = (
  max: number,
  contentHeights: DefaultSheetContentHeights
): number[] => {
  const base = SHEET_HANDLE_HEIGHT_PX + SHEET_CONTENT_BOTTOM_PADDING_PX;
  const h = contentHeights;
  const second = Math.max(
    MIN_HEIGHT_PX,
    Math.min(max, base + h.upToLostFindActions - CONTENT_SNAP_OFFSET_PX)
  );
  const third = Math.max(
    MIN_HEIGHT_PX,
    Math.min(max, base + h.upToRecentFoundItemSection - CONTENT_SNAP_OFFSET_PX)
  );
  const fourth = Math.max(
    MIN_HEIGHT_PX,
    Math.min(max, base + h.upToPoliceSection - CONTENT_SNAP_OFFSET_PX)
  );
  return [MIN_HEIGHT_PX, second, third, fourth, max];
};

export const getSnapHeights = (
  max: number,
  options?: {
    searchValue: string | null;
    contentHeights?: DefaultSheetContentHeights | null;
  }
): number[] => {
  if (options?.searchValue) {
    return getSnapHeightsByDevice(max);
  }
  if (options?.contentHeights) {
    return getSnapHeightsByContent(max, options.contentHeights);
  }
  return getSnapHeightsByDevice(max);
};
