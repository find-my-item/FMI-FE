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

  describe("기본 cap (9,999)", () => {
    test("cap보다 큰 경우 '9,999+'를 반환합니다", () => {
      expect(formatCappedNumber(10000)).toBe("9,999+");
      expect(formatCappedNumber(1000000)).toBe("9,999+");
      expect(formatCappedNumber(Infinity)).toBe("9,999+");
    });
  });

  describe("커스텀 cap", () => {
    test("cap을 999로 지정하면 999+ 규칙이 적용됩니다", () => {
      expect(formatCappedNumber(999, 999)).toBe("999");
      expect(formatCappedNumber(1000, 999)).toBe("999+");
      expect(formatCappedNumber(5000, 999)).toBe("999+");
    });
  });
});
