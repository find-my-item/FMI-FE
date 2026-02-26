import { renderHook } from "@testing-library/react";
import { useHiddenPath } from "./useHiddenPath";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("useHiddenPath", () => {
  it("pathname이 '/'일 경우 false를 반환해야 한다(푸터 표시)", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("pathname이 '/about'일 경우 false를 반환해야 한다(푸터 표시)", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("pathname이 null일 경우 false를 반환해야 한다", () => {
    (usePathname as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("hiddenExactPaths: 알림 설정, 비밀번호 변경, 회원 탈퇴 경로일 경우 true를 반환해야 한다", () => {
    ["/mypage/notifications", "/change-password", "/mypage/delete-account"].forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      const { result } = renderHook(() => useHiddenPath());
      expect(result.current).toBe(true);
    });
  });

  it("pathname이 /mypage일 경우 false를 반환해야 한다(마이페이지 목록, 푸터 표시)", () => {
    (usePathname as jest.Mock).mockReturnValue("/mypage");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("pathname이 /mypage/posts, /mypage/reports, /mypage/inquiries일 경우 false를 반환해야 한다(리스트 페이지, 푸터 표시)", () => {
    ["/mypage/posts", "/mypage/reports", "/mypage/inquiries"].forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      const { result } = renderHook(() => useHiddenPath());
      expect(result.current).toBe(false);
    });
  });

  it("pathname이 /list/1(게시글 상세)일 경우 false를 반환해야 한다(푸터 표시)", () => {
    (usePathname as jest.Mock).mockReturnValue("/list/1");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(false);
  });

  it("pathname이 /chat/1(채팅방 상세)일 경우 true를 반환해야 한다(푸터 숨김)", () => {
    (usePathname as jest.Mock).mockReturnValue("/chat/1");
    const { result } = renderHook(() => useHiddenPath());
    expect(result.current).toBe(true);
  });

  it("pathname이 /mypage/reports/1, /mypage/inquiries/123일 경우 true를 반환해야 한다(마이페이지 상세, 푸터 숨김)", () => {
    ["/mypage/reports/1", "/mypage/inquiries/123"].forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      const { result } = renderHook(() => useHiddenPath());
      expect(result.current).toBe(true);
    });
  });
});
