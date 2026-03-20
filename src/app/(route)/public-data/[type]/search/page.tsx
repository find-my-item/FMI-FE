import { Suspense } from "react";
import { DetailHeader } from "@/components/layout";
import { PublicDataSearchContent } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="게시글 검색" />

      <Suspense fallback={null}>
        <PublicDataSearchContent />
      </Suspense>
    </>
  );
};

export default page;
