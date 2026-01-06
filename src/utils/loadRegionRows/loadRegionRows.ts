/**
 * @author jikwon
 *
 * 지역 정보 fetch 함수
 */

import { RegionRow } from "@/types";

export const loadRegionRows = async (): Promise<RegionRow[]> => {
  const res = await fetch("/regions/eup-myeon-dong.min.json", { cache: "force-cache" });
  if (!res.ok) throw new Error(`위치 정보를 불러오는데 실패했습니다: ${res.status}`);

  const raw: string[] = await res.json();

  return raw
    .map((row) => {
      const [sido, sigungu, location, leafType] = row.split("|");
      if (!sido || !sigungu || !location) return null;
      return {
        sido,
        sigungu,
        location,
        leafType: leafType ?? "",
        display: `${sido} ${sigungu} ${location}`,
      };
    })
    .filter(Boolean) as RegionRow[];
};
