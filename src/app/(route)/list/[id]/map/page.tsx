import { Suspense } from "react";
import { DetailHeader } from "@/components";
import MapContent from "./_components/MapContent/MapContent";

const page = () => {
  return (
    <section className="h-dvh">
      <DetailHeader title="분실/습득 위치" />
      <h1 className="sr-only">분실/습득 위치 지도</h1>

      <Suspense fallback={null}>
        <MapContent />
      </Suspense>
    </section>
  );
};

export default page;
