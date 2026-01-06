import { getItemCategoryLabel } from "./getItemCategoryLabel";

describe("getItemCategoryLabel", () => {
  test("category에 따라 올바른 라벨을 반환한다", () => {
    expect(getItemCategoryLabel("ELECTRONICS")).toBe("전자기기");
    expect(getItemCategoryLabel("WALLET")).toBe("지갑");
    expect(getItemCategoryLabel("ID_CARD")).toBe("신분증");
    expect(getItemCategoryLabel("JEWELRY")).toBe("귀금속");
    expect(getItemCategoryLabel("BAG")).toBe("가방");
    expect(getItemCategoryLabel("CARD")).toBe("카드");
    expect(getItemCategoryLabel("ETC")).toBe("기타");
  });
});
