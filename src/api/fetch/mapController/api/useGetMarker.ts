import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetMarkerResponse } from "../types/GetMarkerType";
import { useMainKakaoMapStore } from "@/store";

const useGetMarker = () => {
  const { latLng, mapLevel } = useMainKakaoMapStore();
  const level = Math.min(mapLevel, 11);
  const { lat: latitude, lng: longitude } = latLng;

  return useAppQuery<GetMarkerResponse>(
    "public",
    ["marker", latitude, longitude],
    `/main/posts/marker?latitude=${latitude}&longitude=${longitude}&level=${level}`
  );
};

export default useGetMarker;
