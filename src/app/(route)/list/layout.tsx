import DetailHeader from "@/components/DetailHeader/DetailHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DetailHeader title="게시글" />
      <div className="min-h-[calc(100vh-60px)] w-full">{children}</div>
    </>
  );
};

export default layout;
