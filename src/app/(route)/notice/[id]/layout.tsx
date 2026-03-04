import { ReactNode } from "react";
import { NoticeDetailHeader } from "./_components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NoticeDetailHeader />
      {children}
    </>
  );
};

export default Layout;
