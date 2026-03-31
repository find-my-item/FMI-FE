import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "콘텐츠 활용 동의",
};

const layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default layout;
