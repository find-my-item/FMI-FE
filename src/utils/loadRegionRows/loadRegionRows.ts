/**
 * @author jikwon
 *
 * 행정구역(시 도 / 시 군 구 / 읍 면 동) 정보를 가져오는 함수
 *
 * @returns 지역 정보 배열
 */

import { RegionRow } from "@/types";

export const loadRegionRows = async (): Promise<RegionRow[]> => {
  const res = await fetch("/regions/eup-myeon-dong.min.json", { cache: "force-cache" });
  if (!res.ok) throw new Error(`위치 정보를 불러오는데 실패했습니다: ${res.status}`);

  const raw: string[] = await res.json();

  return raw
    .map((row) => {
      const [sido, sigungu, location, locationType] = row.split("|");
      if (!sido || !sigungu || !location) return null;

      return {
        sido,
        sigungu,
        location,
        locationType: locationType ?? "",
        display: `${sido} ${sigungu} ${location}`,
      };
    })
    .filter(Boolean) as RegionRow[];
};
