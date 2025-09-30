import { usePathname } from "next/navigation";

const visiblePaths = ["/"];

export function useIsHiddenPath() {
  const pathname = usePathname();
  return !visiblePaths.includes(pathname ?? "");
}
