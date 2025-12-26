"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, DetailHeader, InputSearch, PopupLayout } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { Map } from "react-kakao-maps-sdk";
import Script from "next/script";
import KakaoMap from "./KakaoMap";

type RegionRow = {
  sido: string;
  sigungu: string;
  leaf: string;
  leafType: string;
  display: string;
};

const MAX_RESULTS = 30;

const styles = {
  baseButton:
    "text-body1-semibold text-neutral-normal-default min-h-[44px] hover:bg-gray-100 transition-colors",
};

const Page = () => {
  const methods = useForm({
    defaultValues: {
      location: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("location"));
  const [regions, setRegions] = useState<RegionRow[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [km, setKm] = useState("3");

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
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", row.display);

    router.push(`/write/location?${params.toString()}`, { scroll: false });
    setIsPopupOpen(true);
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

      <div className="h-[400px] w-full border-2 border-dashed border-neutral-normal-default">
        <KakaoMap />
      </div>

      {searchParams.get("location") && (
        <section>
          <PopupLayout
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            className="px-5 py-10 flex-col-center"
          >
            <div className="mb-12 gap-4 flex-col-center">
              <p className="flex">
                <span className="text-h2-medium text-layout-header-default">
                  {searchParams.get("location")} 근처
                </span>
                <span className="text-h1-medium text-brand-subtle-default">{km}km</span>
              </p>
              <div className="gap-[14px] py-[14px] flex-center">
                <Button variant="outlined" className={styles.baseButton} onClick={() => setKm("3")}>
                  3km
                </Button>
                <Button variant="outlined" className={styles.baseButton} onClick={() => setKm("5")}>
                  5km
                </Button>
                <Button
                  variant="outlined"
                  className={styles.baseButton}
                  onClick={() => setKm("10")}
                >
                  10km
                </Button>
              </div>
            </div>
            <Button className="min-h-[44px] w-full" onClick={() => setIsPopupOpen(false)}>
              적용하기
            </Button>
          </PopupLayout>
        </section>
      )}
    </div>
  );
};

// const Page = () => {
//   <Suspense fallback="">
//     <LocationPage />
//   </Suspense>;
// };

export default Page;
