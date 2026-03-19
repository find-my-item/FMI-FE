"use client";

import { useSearchParams } from "next/navigation";
import { InfiniteData } from "@tanstack/react-query";
import { PublicDataResponse } from "@/types";
import { PUBLIC_CATEGORY_CODES } from "@/constants";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";

export const usePublicDataListQuery = () => {
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type")?.toLowerCase() || "lost";
  const type = typeParam === "found" ? "found" : "lost";

  const categoryValue = searchParams.get("category") || "";
  const region = searchParams.get("region") || "";

  const isLost = type === "lost";
  const apiEndpoint = isLost ? "/public/lost" : "/public/found";

  const params = new URLSearchParams();
  if (categoryValue) {
    const categoryConfig = PUBLIC_CATEGORY_CODES.find((c) => c.value === categoryValue);
    if (categoryConfig) {
      params.append("PRDT_CL_CD_01", categoryConfig.value);
    }
  }

  if (region) {
    params.append(isLost ? "LST_LCT_CD" : "N_FD_LCT_CD", region);
  }

  params.append("numOfRows", "10");

  const queryStr = params.toString();
  const url = queryStr ? `${apiEndpoint}?${queryStr}` : apiEndpoint;

  return useAppInfiniteQuery<PublicDataResponse, Error, InfiniteData<PublicDataResponse>>(
    "public",
    ["publicDataList", type, categoryValue, region],
    url,
    {
      pageParamName: "pageNo",
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { pageNo, numOfRows, totalCount } = lastPage;
        const isLastPage = pageNo * numOfRows >= totalCount;
        return isLastPage ? undefined : pageNo + 1;
      },
    }
  );
};
