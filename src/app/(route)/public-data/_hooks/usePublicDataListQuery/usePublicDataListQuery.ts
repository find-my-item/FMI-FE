"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PublicDataResponse } from "@/types";
import { PUBLIC_CATEGORY_CODES } from "@/constants";

export const usePublicDataListQuery = () => {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "lost";
  const categoryValue = searchParams.get("category") || "";
  const region = searchParams.get("region") || "";
  const pageNo = searchParams.get("page") || "1";

  return useQuery<PublicDataResponse>({
    queryKey: ["publicDataList", type, categoryValue, region, pageNo],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (categoryValue) {
        const categoryConfig = PUBLIC_CATEGORY_CODES.find((c) => c.value === categoryValue);
        if (categoryConfig) {
          params.append("PRDT_CL_CD_01", categoryConfig.value);
        }
      }

      const isLost = type === "lost";
      const apiEndpoint = isLost ? "/api/public/lost" : "/api/public/found";

      if (region) {
        params.append(isLost ? "LST_LCT_CD" : "N_FD_LCT_CD", region);
      }

      params.append("pageNo", pageNo);
      params.append("numOfRows", "10");

      const response = await fetch(`${apiEndpoint}?${params.toString()}`);

      if (!response.ok) {
        throw new Error("데이터를 불러오지 못했어요");
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};
