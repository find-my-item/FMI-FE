"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { InputSearch } from "@/components";
import { useRegionRows } from "@/hooks";
import { RegionRow } from "@/types";

const MAX_RESULTS = 30;

interface LocationSearchSectionProps {
  searchParams: URLSearchParams;
}

const LocationSearchSection = ({ searchParams }: LocationSearchSectionProps) => {
  const router = useRouter();

  const { regions, isLoading } = useRegionRows();

  const methods = useForm({
    defaultValues: {
      location: "",
    },
    mode: "onChange",
  });

  const locationValue = useWatch({
    control: methods.control,
    name: "location",
  });

  const results = useMemo(() => {
    const q = (locationValue ?? "").trim();
    if (!q) return [];

    const lowered = q.toLowerCase();

    const matched: RegionRow[] = [];
    for (let i = 0; i < regions.length; i += 1) {
      const r = regions[i];
      if (r.display.toLowerCase().includes(lowered)) {
        matched.push(r);
        if (matched.length >= MAX_RESULTS) break;
      }
    }
    return matched;
  }, [locationValue, regions]);

  const handleSelect = (row: RegionRow) => {
    methods.setValue("location", row.display);

    const params = new URLSearchParams(searchParams.toString());
    params.set("location", row.display);

    router.push(`/write/location?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <section className="px-5 py-[10px]">
        <FormProvider {...methods}>
          <InputSearch
            placeholder="지역명을 입력해 주세요."
            name="location"
            mode="RHF"
            onEnter={(value) => console.log(value)}
          />
        </FormProvider>
      </section>

      <section aria-label="검색 결과" className="px-0">
        <p className="sr-only" aria-live="polite">
          {locationValue?.trim() && isLoading
            ? `검색 결과 ${results.length}개`
            : "지역 목록을 불러오는 중입니다"}
        </p>

        <ul>
          {results.map((row) => {
            const key = `${row.sido}|${row.sigungu}|${row.leaf}|${row.leafType}`;
            return (
              <li
                key={key}
                className="border-b border-neutral-normal-default transition-colors hover:bg-gray-100"
              >
                <button
                  type="button"
                  className="w-full p-5 text-left text-body2-medium text-neutral-strong-default"
                  onClick={() => handleSelect(row)}
                >
                  {row.display}
                </button>
              </li>
            );
          })}

          {isLoading && locationValue?.trim() && results.length === 0 && (
            <li className="p-5 text-body2-medium text-neutral-strong-default">
              검색 결과가 없습니다.
            </li>
          )}
        </ul>
      </section>
    </>
  );
};

export default LocationSearchSection;
