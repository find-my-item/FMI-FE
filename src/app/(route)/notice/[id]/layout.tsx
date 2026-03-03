import { ReactNode } from "react";
import { NoticeDetailHeader } from "./_components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NoticeDetailHeader />
      <h1 className="sr-only">공지사항 상세</h1>
      {children}
    </>
  );
};

export default Layout;
