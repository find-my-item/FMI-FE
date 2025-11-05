import { renderHook } from "@testing-library/react";
import { useHiddenPath } from "./useHiddenPath";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("useHiddenPath", () => {
  it("pathname이 '/'일 경우 false를 반환해야 한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("pathname이 '/'가 아닐 경우 true를 반환해야 한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(true);
  });

  it("pathname이 null일 경우 true를 반환해야 한다", () => {
    (usePathname as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(true);
  });
});
