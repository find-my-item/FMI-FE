"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { DetailHeader, InputSearch } from "@/components";
import { BottomSheet, KakaoMap } from "./_components";
import { useRegionRows } from "@/hooks";
import { RegionRow } from "@/types";

const MAX_RESULTS = 30;

const LocationPage = () => {
  const methods = useForm({
    defaultValues: {
      location: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [radius, setRadius] = useState("3000");

  const locationValue = useWatch({
    control: methods.control,
    name: "location",
  });

  const { regions, isLoading } = useRegionRows();

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

  const locationTitle = searchParams.get("location");
  const leaf = locationTitle?.trim().split(/\s+/).at(-1) ?? null;

  return (
    <div className="w-full h-base">
      <DetailHeader title={locationTitle ? "위치 상세" : "위치 등록"} />
      <h1 className="sr-only">위치등록 페이지</h1>

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

      {locationTitle && (
        <>
          <div className="h-[calc(100vh-380px)] w-full">
            <KakaoMap />
          </div>

          <BottomSheet location={leaf} radius={radius} setRadius={setRadius} />
        </>
      )}
    </div>
  );
};

const Page = () => (
  <Suspense fallback={null}>
    <LocationPage />
  </Suspense>
);

export default Page;
