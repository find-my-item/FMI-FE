import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 설정",
};

const layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default layout;
