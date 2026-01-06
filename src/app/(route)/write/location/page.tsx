"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DetailHeader } from "@/components";
import { LocationRangeSection, LocationSearchSection } from "./_components";

const LocationPage = () => {
  const searchParams = useSearchParams();

  const locationTitle = searchParams.get("location");
  const leaf = locationTitle?.trim().split(/\s+/).at(-1) ?? null;

  return (
    <div className="w-full h-base">
      <DetailHeader title={locationTitle ? "위치 상세" : "위치 등록"} />
      <h1 className="sr-only">위치등록 페이지</h1>

      {!locationTitle ? (
        <LocationSearchSection searchParams={searchParams} />
      ) : (
        <LocationRangeSection leaf={leaf} />
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
