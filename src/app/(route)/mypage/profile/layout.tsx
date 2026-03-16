import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "프로필 설정",
  description: "나의 찾아줘 프로필을 관리해보세요.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
