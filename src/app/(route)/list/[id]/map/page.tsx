import { Suspense } from "react";
import { DetailHeader } from "@/components/layout";
import { PostDetailKakaoMap } from "./_components";

const page = () => {
  return (
    <section className="flex h-screen flex-col">
      <DetailHeader title="분실/발견 위치" />

      <div className="min-h-0 flex-1">
        <Suspense fallback={null}>
          <PostDetailKakaoMap />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
