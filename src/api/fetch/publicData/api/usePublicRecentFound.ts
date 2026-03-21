"use client";

import useAppQuery from "@/api/_base/query/useAppQuery";
import { PublicDataResponse } from "@/types";

export const usePublicRecentFound = (numOfRows: number = 5) => {
  return useAppQuery<PublicDataResponse>(
    "public",
    ["public-recent-found", numOfRows],
    `/public/found?numOfRows=${numOfRows}`
  );
};
