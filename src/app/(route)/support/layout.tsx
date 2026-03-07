import { DetailHeader } from "@/components/layout";
import { ReactNode } from "react";
import { FloatingInquiryButton } from "./_components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DetailHeader title="자주 묻는 질문 (FAQ)" />
      <h1 className="sr-only">자주 묻는 질문 (FAQ)</h1>
      {children}
      <FloatingInquiryButton />
    </>
  );
};

export default Layout;
