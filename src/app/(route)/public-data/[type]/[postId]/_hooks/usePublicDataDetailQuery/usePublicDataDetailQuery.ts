"use client";

import { useQuery } from "@tanstack/react-query";

export const usePublicDataDetailQuery = (atcId: string) => {
  return useQuery<any>({
    queryKey: ["publicDataDetail", atcId],
    queryFn: async () => {
      if (!atcId) throw new Error("atcId is required");

      const params = new URLSearchParams();
      params.append("atcId", atcId);

      const response = await fetch(`/api/public?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch public data detail");
      }

      const data = await response.json();

      return data.items?.item || null;
    },
    enabled: !!atcId,
    staleTime: 1000 * 60 * 60,
  });
};
