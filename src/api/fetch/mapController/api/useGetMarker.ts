import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetMarkerResponse } from "../types/GetMarkerType";
import { useMainKakaoMapStore } from "@/store";
import { keepPreviousData } from "@tanstack/react-query";

const useGetMarker = () => {
  const { latLng, mapLevel } = useMainKakaoMapStore();
  const level = Math.min(mapLevel, 11);
  const { lat: latitude, lng: longitude } = latLng;

  return useAppQuery<GetMarkerResponse>(
    "public",
    ["marker", latitude, longitude, level],
    `/main/posts/marker?latitude=${latitude}&longitude=${longitude}&level=${level}`,
    { placeholderData: keepPreviousData }
  );
};

export default useGetMarker;
