import { DetailHeader } from "@/components/layout";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DetailHeader title="자주 묻는 질문 (FAQ)" />
      {children}
    </>
  );
};

export default Layout;
