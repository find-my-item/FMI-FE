import { formatViewCount } from "./formatViewCount";

describe("formatViewCount", () => {
  describe("1,000 미만", () => {
    it("조회수를 그대로 표기한다", () => {
      expect(formatViewCount(0)).toBe("0회");
      expect(formatViewCount(1)).toBe("1회");
      expect(formatViewCount(999)).toBe("999회");
    });
  });

  describe("1,000 이상 10,000 미만 (천 단위)", () => {
    it("정수 천 단위는 소수점 없이 표기한다", () => {
      expect(formatViewCount(1_000)).toBe("1천회");
      expect(formatViewCount(5_000)).toBe("5천회");
    });

    it("소수점이 필요한 경우 한 자리까지 표기한다", () => {
      expect(formatViewCount(1_200)).toBe("1.2천회");
      expect(formatViewCount(9_900)).toBe("9.9천회");
    });
  });

  describe("10,000 이상 1,000,000 미만 (만 단위)", () => {
    it("정수 만 단위는 소수점 없이 표기한다", () => {
      expect(formatViewCount(10_000)).toBe("1만회");
      expect(formatViewCount(120_000)).toBe("12만회");
    });

    it("소수점이 필요한 경우 한 자리까지 표기한다", () => {
      expect(formatViewCount(12_300)).toBe("1.2만회");
      expect(formatViewCount(62_000)).toBe("6.2만회");
    });
  });

  describe("1,000,000 이상", () => {
    it("만 단위로 절삭하여 정수로 표기한다", () => {
      expect(formatViewCount(1_000_000)).toBe("100만회");
      expect(formatViewCount(3_690_000)).toBe("369만회");
      expect(formatViewCount(10_290_000)).toBe("1029만회");
    });
  });
});
