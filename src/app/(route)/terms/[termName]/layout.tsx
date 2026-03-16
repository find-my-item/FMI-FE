import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "이용 약관",
  description: "찾아줘 서비스에 액세스하거나 서비스를 이용할 때 적용되는 약관을 확인해보세요.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
