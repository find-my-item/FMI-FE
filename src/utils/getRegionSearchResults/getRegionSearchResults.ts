import { RegionRow } from "@/types";

interface GetRegionSearchResultsParams {
  regions: RegionRow[];
  query?: string | null;
  maxResults?: number;
}

/**
 * @author jikwon
 *
 * 지역 목록에서 검색어를 기준으로 일치하는 지역을 필터링합니다.
 *
 * @param regions - 지역 목록
 * @param query - 검색어
 * @param maxResults - 최대 결과 개수
 * @returns 일치하는 지역 목록
 */

export const getRegionSearchResults = ({
  regions,
  query,
  maxResults = 30,
}: GetRegionSearchResultsParams): RegionRow[] => {
  const q = (query ?? "").trim();
  if (!q) return [];

  const lowered = q.toLowerCase();

  const matched: RegionRow[] = [];
  for (let i = 0; i < regions.length; i += 1) {
    const r = regions[i];
    if (r.display.toLowerCase().includes(lowered)) {
      matched.push(r);
      if (matched.length >= maxResults) break;
    }
  }

  return matched;
};
