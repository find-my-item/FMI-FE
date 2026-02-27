"use client";

import { Suspense } from "react";
import NotFound from "@/app/not-found";
import { WriteForm } from "./_components";
import useWritePageType from "./_hooks/useWritePageType/useWritePageType";

const WritePage = () => {
  const { isValid, title } = useWritePageType();
  if (!isValid) return <NotFound />;

  return <WriteForm title={title} />;
};

const Page = () => {
  return (
    <Suspense fallback={null}>
      <WritePage />
    </Suspense>
  );
};

export default Page;
