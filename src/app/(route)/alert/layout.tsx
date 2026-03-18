import { ReactNode } from "react";
import type { Metadata } from "next";
import { AlertDetailHeader } from "./_components";

export const metadata: Metadata = {
  title: "알림",
  description: "찾아줘에서 나에게 온 알림을 확인해보세요.",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-base">
      <AlertDetailHeader />
      <h1 className="sr-only">알림 페이지</h1>
      {children}
    </div>
  );
};

export default layout;
