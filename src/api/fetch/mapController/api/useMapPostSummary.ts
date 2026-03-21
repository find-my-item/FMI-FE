import useAppQuery from "@/api/_base/query/useAppQuery";
import { useMainKakaoMapStore } from "@/store";
import { MapPostSummaryResponse } from "../types/MapPostSummaryType";

const useMapPostSummary = (postId: number) => {
  const { mapLevel } = useMainKakaoMapStore();
  const level = Math.min(mapLevel, 11);

  return useAppQuery<MapPostSummaryResponse>(
    "public",
    ["map-post-summary", postId, level],
    `/main/posts/${postId}/summary?level=${level}`
  );
};

export default useMapPostSummary;
