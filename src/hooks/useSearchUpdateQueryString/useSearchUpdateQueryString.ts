import { useSearchParams, useRouter, usePathname } from "next/navigation";

type SearchMode = "default" | "region" | "post";

const useSearchUpdateQueryString = (routerMode: "push" | "replace" = "push") => {
  const router = useRouter();
  const searchPrams = useSearchParams();
  const pathname = usePathname();
  const searchMode = (searchPrams.get("search") as SearchMode) || "default";

  const searchUpdateQuery = (key: string, value?: string) => {
    const params = new URLSearchParams(searchPrams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const url = `${pathname}?${params.toString()}`;

    if (routerMode === "replace") {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  };

  return { searchMode, searchUpdateQuery };
};

export default useSearchUpdateQueryString;
