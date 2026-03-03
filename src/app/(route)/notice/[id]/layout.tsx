import { ReactNode } from "react";
import { NoticeDetailHeader } from "./_components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-base">
      <NoticeDetailHeader />
      <h1 className="sr-only">공지사항 상세</h1>
      {children}
    </div>
  );
};

export default Layout;
