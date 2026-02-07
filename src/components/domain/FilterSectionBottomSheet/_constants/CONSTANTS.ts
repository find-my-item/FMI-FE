export const tabs = [
  { label: "지역", value: "region" },
  { label: "카테고리", value: "category" },
  { label: "정렬", value: "sort" },
  { label: "찾음여부", value: "status" },
] as const;

export const categories = [
  { label: "전체", value: undefined },
  { label: "전자기기", value: "ELECTRONICS" },
  { label: "지갑", value: "WALLET" },
  { label: "신분증", value: "ID_CARD" },
  { label: "귀금속", value: "JEWELRY" },
  { label: "가방", value: "BAG" },
  { label: "카드", value: "CARD" },
  { label: "기타", value: "ETC" },
] as const;

export const sort = [
  { label: "최신순", value: "LATEST" },
  { label: "오래된 순", value: "OLDEST" },
  { label: "즐겨찾기 많은 순", value: "MOST_FAVORITED" },
  { label: "조회수 많은 순", value: "MOST_VIEWED" },
] as const;

export const findStatus = [
  { label: "전체", value: undefined },
  { label: "찾는중", value: "SEARCHING" },
  { label: "찾았음", value: "FOUND" },
] as const;

export const status = [
  { label: "전체", value: undefined },
  { label: "분실", value: "LOST" },
  { label: "습득", value: "FOUND" },
] as const;
