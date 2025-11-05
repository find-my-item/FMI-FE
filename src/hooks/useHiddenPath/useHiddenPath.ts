import { usePathname } from "next/navigation";

const shownPaths = ["/"];

export function useHiddenPath() {
  const pathname = usePathname();
  return !shownPaths.includes(pathname ?? "");
}
