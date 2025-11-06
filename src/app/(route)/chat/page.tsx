"use client";

import { Suspense } from "react";
import ListView from "./_components/ListView/ListView";

const page = () => {
  return (
    <Suspense fallback="">
      <ListView />
    </Suspense>
  );
};

export default page;
