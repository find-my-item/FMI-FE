import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "찾아줘 계정을 만들어 분실물을 찾고 습득물을 공유해보세요.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
