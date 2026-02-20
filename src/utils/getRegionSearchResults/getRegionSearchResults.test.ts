import { getRegionSearchResults } from "./getRegionSearchResults";

const regions = [
  {
    id: 1,
    name: "서울특별시",
    sido: "서울특별시",
    sigungu: "",
    location: "",
    display: "서울특별시",
  },
  {
    id: 2,
    name: "부산광역시",
    sido: "부산광역시",
    sigungu: "",
    location: "",
    display: "부산광역시",
  },
  {
    id: 3,
    name: "대구광역시",
    sido: "대구광역시",
    sigungu: "",
    location: "",
    display: "대구광역시",
  },
];

describe("getRegionSearchResults", () => {
  it("검색어와 일치하는 지역을 반환한다", () => {
    const result = getRegionSearchResults({ regions, query: "서울" });
    expect(result).toEqual([
      {
        id: 1,
        name: "서울특별시",
        sido: "서울특별시",
        sigungu: "",
        location: "",
        display: "서울특별시",
      },
    ]);
  });

  it("query가 없으면 빈 배열을 반환한다", () => {
    const result = getRegionSearchResults({ regions, query: "" });
    expect(result).toEqual([]);
  });

  it("maxResults 개수까지만 반환한다", () => {
    const result = getRegionSearchResults({
      regions,
      query: "광역시",
      maxResults: 1,
    });

    expect(result).toHaveLength(1);
  });
});
