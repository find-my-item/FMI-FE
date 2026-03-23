import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetMarkerResponse } from "../types/GetMarkerType";
import { useMainKakaoMapStore } from "@/store";
import { keepPreviousData } from "@tanstack/react-query";

const MARKER_FETCH_DISABLED_LEVEL_MIN = 9;
const MARKER_FETCH_DISABLED_LEVEL_MAX = 13;

export const isMarkerFetchDisabledByZoom = (mapLevel: number): boolean => {
  return mapLevel >= MARKER_FETCH_DISABLED_LEVEL_MIN && mapLevel <= MARKER_FETCH_DISABLED_LEVEL_MAX;
};

const useGetMarker = () => {
  const { latLng, mapLevel } = useMainKakaoMapStore();
  const level = Math.min(mapLevel, 11);
  const { lat: latitude, lng: longitude } = latLng;

  const isMarkerFetchDisabled = isMarkerFetchDisabledByZoom(mapLevel);

  return useAppQuery<GetMarkerResponse>(
    "public",
    ["marker", latitude, longitude, level],
    `/main/posts/marker?latitude=${latitude}&longitude=${longitude}&level=${level}`,
    {
      placeholderData: keepPreviousData,
      enabled: !isMarkerFetchDisabled,
    }
  );
};

export default useGetMarker;
