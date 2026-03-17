import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
  description: "찾아줘에 등록된 공지사항을 확인해보세요.",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
