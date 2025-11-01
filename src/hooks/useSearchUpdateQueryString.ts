import { useSearchParams, useRouter, usePathname } from "next/navigation";

type SearchMode = "default" | "region" | "post";

const useSearchUpdateQueryString = () => {
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
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { searchMode, searchUpdateQuery };
};

export default useSearchUpdateQueryString;
