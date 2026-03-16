"use client";

import { Suspense } from "react";
import { Icon } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { PublicDataView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title={<Icon name="DetailPolice24" size={154} />}>
        <HeaderSearch />
      </DetailHeader>

      <Suspense fallback={null}>
        <PublicDataView />
      </Suspense>
    </>
  );
};

export default page;
