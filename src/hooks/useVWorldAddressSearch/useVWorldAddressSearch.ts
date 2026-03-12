import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export interface VWorldAddressItem {
  address: {
    road: string;
    parcel: string;
  };
  point: {
    x: string;
    y: string;
  };
  title: string;
}

interface VWorldSearchResponse {
  response: {
    status: string;
    result?: {
      items: VWorldAddressItem[];
    };
    error?: {
      text: string;
    };
  };
}

/**
 * @author jikwon
 * @description 브이월드 검색 API를 사용하여 주소 자동완성 기능을 제공하는 커스텀 훅입니다.
 *
 * @param query 검색어
 * @param delay 디바운스 시간 (ms)
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useVWorldAddressSearch("서울특별시");
 * ```
 */
const useVWorldAddressSearch = (query: string, delay = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return useQuery({
    queryKey: ["vworldSearch", debouncedQuery],
    queryFn: async () => {
      const q = debouncedQuery.trim();
      if (q.length < 2) return [];

      const response = await fetch(`/api/vworld?query=${encodeURIComponent(q)}`);
      if (!response.ok) {
        throw new Error("VWorld API request failed");
      }

      const data: VWorldSearchResponse = await response.json();

      if (data.response.status === "NOT_FOUND") return [];
      return data.response.result?.items || [];
    },
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 1000 * 60 * 5,
  });
};

export default useVWorldAddressSearch;
