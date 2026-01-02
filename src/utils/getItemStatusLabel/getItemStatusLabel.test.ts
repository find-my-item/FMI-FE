import { getItemStatusLabel } from "./getItemStatusLabel";

describe("getItemStatusLabel", () => {
  test("상태에 따라 올바른 라벨을 반환한다", () => {
    expect(getItemStatusLabel("SEARCHING")).toBe("찾는중");
    expect(getItemStatusLabel("FOUND")).toBe("찾았음");
  });
});
