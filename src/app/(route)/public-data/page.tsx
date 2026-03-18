"use client";

import { Suspense } from "react";
import Image from "next/image";
import { DetailHeader } from "@/components/layout";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { PublicDataView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader
        title={
          <Image
            src="/public-data/public-detail-police24.svg"
            alt=""
            width={130}
            height={26}
            priority
          />
        }
      >
        <HeaderSearch />
      </DetailHeader>

      <Suspense fallback={null}>
        <PublicDataView />
      </Suspense>
    </>
  );
};

export default page;
