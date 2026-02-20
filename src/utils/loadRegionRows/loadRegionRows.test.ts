import { loadRegionRows } from "./loadRegionRows";

describe("loadRegionRows", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("행정구역 row를 파싱해 RegionRow[]로 변환한다", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ["서울특별시|강남구|역삼동|EUP", "서울특별시|강남구|삼성동|"],
    });

    const result = await loadRegionRows();

    expect(result).toEqual([
      {
        sido: "서울특별시",
        sigungu: "강남구",
        location: "역삼동",
        locationType: "EUP",
        display: "서울특별시 강남구 역삼동",
      },
      {
        sido: "서울특별시",
        sigungu: "강남구",
        location: "삼성동",
        locationType: "",
        display: "서울특별시 강남구 삼성동",
      },
    ]);
  });

  it("sido/sigungu/location 중 하나라도 없으면 해당 row는 제외한다", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ["서울특별시|강남구||EUP", "서울특별시|강남구|역삼동|EUP"],
    });

    const result = await loadRegionRows();

    expect(result).toHaveLength(1);
    expect(result[0].location).toBe("역삼동");
  });

  it("응답이 ok가 아니면 에러를 던진다", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(loadRegionRows()).rejects.toThrow("위치 정보를 불러오는데 실패했습니다: 500");
  });
});
