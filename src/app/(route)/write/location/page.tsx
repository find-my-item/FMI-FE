"use client";

import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { DetailHeader, InputSearch } from "@/components";

type RegionRow = {
  sido: string;
  sigungu: string;
  leaf: string;
  leafType: string;
  display: string;
};

const MAX_RESULTS = 30;

const page = () => {
  const methods = useForm({
    defaultValues: {
      location: "",
    },
    mode: "onChange",
  });

  const [regions, setRegions] = useState<RegionRow[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const locationValue = useWatch({
    control: methods.control,
    name: "location",
  });

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch("/regions/eup-myeon-dong.min.json", { cache: "force-cache" });
        if (!res.ok) throw new Error(`위치 정보를 불러오는데 실패했습니다: ${res.status}`);

        const raw: string[] = await res.json();

        const parsed: RegionRow[] = raw
          .map((row) => {
            const [sido, sigungu, leaf, leafType] = row.split("|");
            if (!sido || !sigungu || !leaf) return null;
            return {
              sido,
              sigungu,
              leaf,
              leafType: leafType ?? "",
              display: `${sido} ${sigungu} ${leaf}`,
            };
          })
          .filter(Boolean) as RegionRow[];

        if (!isMounted) return;
        setRegions(parsed);
        setIsLoaded(true);
      } catch (e) {
        console.error(e);
        if (!isMounted) return;
        setRegions([]);
        setIsLoaded(true);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const results = useMemo(() => {
    const q = (locationValue ?? "").trim();
    if (!q) return [];

    const lowered = q.toLowerCase();

    const matched: RegionRow[] = [];
    for (let i = 0; i < regions.length; i += 1) {
      const r = regions[i];
      if (r.leaf.toLowerCase().includes(lowered)) {
        matched.push(r);
        if (matched.length >= MAX_RESULTS) break;
      }
    }
    return matched;
  }, [locationValue, regions]);

  const handleSelect = (row: RegionRow) => {
    methods.setValue("location", row.display);

    console.log("selected:", row);
  };

  return (
    <div className="min-h-[100dvh] w-full">
      <h1 className="sr-only">위치등록 페이지</h1>
      <DetailHeader title="위치등록" />

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
          {locationValue?.trim()
            ? isLoaded
              ? `검색 결과 ${results.length}개`
              : "지역 목록을 불러오는 중입니다"
            : ""}
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

          {isLoaded && locationValue?.trim() && results.length === 0 && (
            <li className="p-5 text-body2-medium text-neutral-strong-default">
              검색 결과가 없습니다.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default page;
