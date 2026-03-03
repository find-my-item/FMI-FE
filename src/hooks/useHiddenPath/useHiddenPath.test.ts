import { renderHook } from "@testing-library/react";
import { useHiddenPath } from "./useHiddenPath";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("useHiddenPath - Footer가 노출되어야 하는 페이지", () => {
  it("홈('/')에서는 Footer가 보여야 하므로 false를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("게시글 리스트('/list')에서는 Footer가 보여야 하므로 false를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/list");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("채팅 리스트('/chat')에서는 Footer가 보여야 하므로 false를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/chat");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("알림 리스트('/alert')에서는 Footer가 보여야 하므로 false를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/alert");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("마이페이지 메인('/mypage')에서는 Footer가 보여야 하므로 false를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/mypage");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });
});

describe("useHiddenPath - 나머지 모든 페이지에서는 Footer가 숨겨져야 한다", () => {
  it("정의된 5개 경로 이외의 일반 페이지('/about')에서는 Footer를 숨기므로 true를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(true);
  });

  it("pathname이 null일 경우 빈 문자열로 처리되어 Footer를 숨기므로 true를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(true);
  });

  it("마이페이지 하위 리스트(/mypage/posts 등)에서는 Footer를 숨기므로 true를 반환한다", () => {
    ["/mypage/posts", "/mypage/reports", "/mypage/inquiries"].forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      const { result } = renderHook(() => useHiddenPath());
      expect(result.current).toBe(true);
    });
  });

  it("게시글 상세(/list/1)에서는 Footer를 숨기므로 true를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/list/1");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(true);
  });

  it("채팅방 상세(/chat/1)에서는 Footer를 숨기므로 true를 반환한다", () => {
    (usePathname as jest.Mock).mockReturnValue("/chat/1");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(true);
  });

  it("마이페이지 상세(/mypage/reports/1, /mypage/inquiries/123)에서는 Footer를 숨기므로 true를 반환한다", () => {
    ["/mypage/reports/1", "/mypage/inquiries/123"].forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      const { result } = renderHook(() => useHiddenPath());
      expect(result.current).toBe(true);
    });
  });
});
