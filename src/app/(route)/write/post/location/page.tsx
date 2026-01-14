"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LocationRangeSection, LocationSearchSection } from "./_components";

const LocationPage = () => {
  const searchParams = useSearchParams();

  const locationTitle = searchParams.get("location");
  const locationName = locationTitle?.trim().split(/\s+/).at(-1) ?? null;

  return (
    <>
      {!locationTitle ? (
        <LocationSearchSection searchParams={searchParams} />
      ) : (
        <LocationRangeSection location={locationName} />
      )}
    </>
  );
};

const Page = () => (
  <Suspense fallback={null}>
    <LocationPage />
  </Suspense>
);

export default Page;
