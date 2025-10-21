"use client";

import { DetailHeader } from "@/components/index";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DetailHeader title="분실했어요 글쓰기">
        <DetailHeader.Save disabled />
      </DetailHeader>
      <main className="min-h-[calc(100vh-60px)] w-full">{children}</main>
    </>
  );
};

export default layout;
