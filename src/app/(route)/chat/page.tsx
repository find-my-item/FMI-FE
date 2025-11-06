"use client";

import { Suspense } from "react";
import { ListView } from "@/app/(route)/chat/_components";

const page = () => {
  return (
    <Suspense fallback="">
      <ListView />
    </Suspense>
  );
};

export default page;
