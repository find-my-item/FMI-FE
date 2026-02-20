import { usePathname } from "next/navigation";

/**
 *
 * @author jikwon
 *
 * 특정 경로에서만 UI를 노출하거나 숨길 때 사용하는 커스텀 훅입니다.
 *
 * `shownPaths` 배열에 포함된 경로에서는 `false`를,
 * 그 외의 경로에서는 `true`를 반환합니다.
 *
 * @example
 * ```tsx
 * const isHidden = useHiddenPath();
 * if (isHidden) return null; // 숨김 처리
 * return <Header />; // 보이는 컴포넌트
 * ```
 *
 */
const shownPaths = ["/", "/list", "/chat", "/mypage"];

export function useHiddenPath() {
  const pathname = usePathname();
  return !shownPaths.includes(pathname ?? "");
}
