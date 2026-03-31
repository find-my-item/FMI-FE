"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DateRangeBottomSheet } from "@/components/domain";
import { useClickOutside } from "@/hooks";
import { useFilterParams } from "@/hooks/domain";
import { AdminFilter } from "@/app/(admin)/admin/_components";
import { AdminFilterItemType } from "@/app/(admin)/admin/_types";
import { getDateRangeLabel } from "@/utils/getDateRangeLabel/getDateRangeLabel";

const getSortLabel = (sortValue?: string) => {
  switch (sortValue) {
    case "OLDEST":
      return "오래된순";
    case "MOST_FAVORITED":
      return "인기순";
    case "LATEST":
    default:
      return "최신순";
  }
};

const ADMIN_CONTENT_SORT_OPTIONS = [
  { value: "LATEST", label: "최신순" },
  { value: "OLDEST", label: "오래된순" },
  { value: "MOST_FAVORITED", label: "인기순" },
];

const ContentAgreeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { startDate, endDate, sort } = useFilterParams();
  const containerRef = useClickOutside(() => setIsSortOpen(false));

  const [bottomSheetFilters, setBottomSheetFilters] = useState<{
    startDate?: string;
    endDate?: string;
  }>({
    startDate: startDate ?? undefined,
    endDate: endDate ?? undefined,
  });

  const [isDateSheetOpen, setIsDateSheetOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    setBottomSheetFilters({
      startDate: startDate ?? undefined,
      endDate: endDate ?? undefined,
    });
  }, [startDate, endDate]);

  const handleSortChange = (newSort: string) => {
    const currentSort = sort || "LATEST";

    if (currentSort === newSort) {
      setIsSortOpen(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (newSort === "LATEST") {
      params.delete("sort");
    } else {
      params.set("sort", newSort.toLowerCase());
    }

    const newQueryString = params.toString();
    router.replace(newQueryString ? `${pathname}?${newQueryString}` : pathname);
    setIsSortOpen(false);
  };

  const adminFilters: AdminFilterItemType[] = [
    {
      label: getDateRangeLabel(startDate, endDate),
      onSelected: !!(startDate || endDate),
      icon: {
        name: "Calendar",
        size: 16,
      },
      iconPosition: "leading",
      onClick: () => setIsDateSheetOpen(true),
    },
    {
      label: getSortLabel(sort),
      onSelected: !!sort && sort !== "LATEST",
      onClick: () => setIsSortOpen((prev) => !prev),
      icon: {
        name: isSortOpen ? "ArrowUp" : "ArrowDown",
        size: 16,
      },
      iconPosition: "trailing",
    },
  ];

  return (
    <div ref={containerRef} className="relative flex flex-col">
      <AdminFilter filters={adminFilters} />

      {isSortOpen && (
        <div className="absolute left-[110px] top-[45px] z-10 flex overflow-hidden rounded-[20px] border border-gray-200 bg-white py-1 text-center shadow-lg flex-col-center">
          {ADMIN_CONTENT_SORT_OPTIONS.map(({ value, label }, index) => (
            <div key={value} className="w-full">
              <button
                className="w-full px-7 py-4 text-h3-medium text-neutral-normal-default transition-colors hover:bg-gray-50"
                onClick={() => handleSortChange(value)}
              >
                {label}
              </button>
              {index < ADMIN_CONTENT_SORT_OPTIONS.length - 1 && (
                <hr className="h-px w-full bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      )}

      {isDateSheetOpen && (
        <DateRangeBottomSheet
          isOpen={isDateSheetOpen}
          onClose={() => setIsDateSheetOpen(false)}
          filters={bottomSheetFilters}
          setFilters={setBottomSheetFilters}
        />
      )}
    </div>
  );
};

export default ContentAgreeFilter;
