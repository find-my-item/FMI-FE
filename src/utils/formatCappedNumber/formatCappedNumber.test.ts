import { formatCappedNumber } from "./formatCappedNumber";

describe("formatCappedNumber", () => {
  test("NaN이면 '0'을 반환합니다", () => {
    expect(formatCappedNumber(NaN)).toBe("0");
  });

  test("0과 한 자리 수를 그대로 문자열로 반환합니다", () => {
    expect(formatCappedNumber(0)).toBe("0");
    expect(formatCappedNumber(7)).toBe("7");
  });

  test("천 단위 구분 기호를 적용합니다", () => {
    expect(formatCappedNumber(1234)).toBe("1,234");
    expect(formatCappedNumber(9999)).toBe("9,999");
  });

  test("10,000 이상이면 '9,999+'를 반환합니다", () => {
    expect(formatCappedNumber(10000)).toBe("9,999+");
    expect(formatCappedNumber(1000000)).toBe("9,999+");
    expect(formatCappedNumber(Infinity)).toBe("9,999+");
  });
});
