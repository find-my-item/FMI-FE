"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useRegionRows } from "@/hooks";
import { getRegionSearchResults, highlightText } from "@/utils";

interface RegionSearchViewProps {
  searchQuery: string;
}

const RegionSearchView = ({ searchQuery }: RegionSearchViewProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: regions = [] } = useRegionRows();
  const regionResults = getRegionSearchResults({
    regions,
    query: searchQuery,
    maxResults: 10,
  });

  const handleRegionClick = (regionValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("region", regionValue);
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isEmptyResult = searchQuery.trim() && regionResults.length === 0;

  return (
    <section className="flex flex-col">
      {regionResults.map((row) => (
        <button
          key={`${row.sido}|${row.sigungu}|${row.location}`}
          type="button"
          onClick={() => handleRegionClick(row.display)}
          className="min-h-[60px] w-full border-b border-neutral-normal-default bg-white p-5 text-left text-body2-medium text-neutral-strong-default transition-colors hover:bg-flatGray-25"
        >
          {highlightText(row.display, searchQuery.trim())}
        </button>
      ))}

      {isEmptyResult && (
        <p className="px-5 py-[10px] text-body1-medium text-layout-header-default">
          검색 결과가 없습니다.
        </p>
      )}
    </section>
  );
};

export default RegionSearchView;
