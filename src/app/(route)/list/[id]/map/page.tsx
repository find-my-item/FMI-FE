"use client";

import { DetailHeader } from "@/components";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DetailKakaoMap from "./_components/DetailKakaoMap/DetailKakaoMap";

const page = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const address = searchParams.get("address");
  const radius = searchParams.get("radius");

  return (
    <div className="min-h-[calc(100dvh-56px)]">
      <Suspense fallback={""}>
        <DetailHeader title="분실/습득 위치" />
        <div className="relative h-[calc(100dvh-56px)] w-full">
          <DetailKakaoMap
            data={{
              lat: lat ? Number(lat) : 0,
              lng: lng ? Number(lng) : 0,
              address: address || "",
              radius: radius ? Number(radius) : 0,
            }}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default page;
