import { usePathname } from "next/navigation";

const hiddenPaths = ["/manual"];

export function useHiddenPath() {
  const pathname = usePathname();
  return hiddenPaths.includes(pathname ?? "");
}
