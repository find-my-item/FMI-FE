import { normalizeEnumValue } from "./normalizeEnumValue";

describe("normalizeEnumValue", () => {
  it("소문자 enum 값을 대문자로 정규화한다.", () => {
    expect(normalizeEnumValue("most_viewed")).toBe("MOST_VIEWED");
    expect(normalizeEnumValue("latest")).toBe("LATEST");
    expect(normalizeEnumValue(null)).toBeUndefined();
  });

  it("null 값을 undefined로 반환한다.", () => {
    expect(normalizeEnumValue(null)).toBeUndefined();
  });

  it("대문자 enum 값을 그대로 반환한다.", () => {
    expect(normalizeEnumValue("MOST_VIEWED")).toBe("MOST_VIEWED");
    expect(normalizeEnumValue("LATEST")).toBe("LATEST");
  });
});
