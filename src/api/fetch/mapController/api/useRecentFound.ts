import useAppQuery from "@/api/_base/query/useAppQuery";
import { RecentFoundResponse } from "../types/RecentFoundType";
import { useMainKakaoMapStore } from "@/store";

const useRecentFound = (level: number) => {
  const { latLng } = useMainKakaoMapStore();
  const { lat: latitude, lng: longitude } = latLng;

  return useAppQuery<RecentFoundResponse>(
    "public",
    ["recent-found"],
    `/main/posts/recent-found?latitude=${latitude}&longitude=${longitude}&level=${level}`
  );
};

export default useRecentFound;
