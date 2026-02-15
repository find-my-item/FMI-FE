import { BaseKakaoMap } from "@/components/domain";
import { BottomSheet } from "./_components";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="h-[calc(100dvh-4px)]">
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
      <Suspense fallback={""}>
        <BottomSheet />
      </Suspense>
    </div>
  );
};

export default Page;
