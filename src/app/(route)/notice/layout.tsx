import { DetailHeader } from "@/components/layout";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-base">
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">공지사항 목록</h1>
      {children}
    </div>
  );
};

export default Layout;
