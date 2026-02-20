import { getMapLevelByRadius } from "./getMapLevelByRadius";

describe("getMapLevelByRadius", () => {
  it("radius가 1000일 때 6을 반환한다", () => {
    expect(getMapLevelByRadius(1000)).toBe(6);
  });

  it("radius가 3000일 때 7을 반환한다", () => {
    expect(getMapLevelByRadius(3000)).toBe(7);
  });

  it("radius가 5000일 때 8을 반환한다", () => {
    expect(getMapLevelByRadius(5000)).toBe(8);
  });

  it("radius가 없을 때 6을 반환한다.", () => {
    expect(getMapLevelByRadius(undefined as any)).toBe(6);
  });
});
