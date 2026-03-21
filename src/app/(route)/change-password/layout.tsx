import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 변경",
  description: "찾아줘 계정의 비밀번호를 안전하게 변경해 보세요.",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default Layout;
