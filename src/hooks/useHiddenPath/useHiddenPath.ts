import { usePathname } from "next/navigation";

/**
 *
 * @author jikwon
 * edited by hyungjun
 *
 * 특정 경로에서만 UI를 노출하거나 숨길 때 사용하는 커스텀 훅입니다.
 *
 * 현재는 아래 페이지에서만 Footer가 노출되도록 제한합니다.
 * - 홈: `/`
 * - 게시글 리스트: `/list`
 * - 채팅 리스트: `/chat`
 * - 알림: `/alert`
 * - 마이페이지 메인: `/mypage`
 *
 * 위 경로에서는 `false`(숨기지 않음)를, 그 외 경로에서는 `true`(숨김)를 반환합니다.
 *
 * @example
 * ```tsx
 * const isHidden = useHiddenPath();
 * if (isHidden) return null; // 숨김 처리
 * return <Header />; // 보이는 컴포넌트
 * ```
 *
 */
const visibleExactPaths = ["/", "/list", "/chat", "/alert", "/mypage", "/admin"];

export const useHiddenPath = () => {
  const pathname = usePathname() ?? "";

  if (visibleExactPaths.includes(pathname)) return false;

  return true;
};
