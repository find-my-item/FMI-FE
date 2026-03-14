import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 찾아줘! 관리자",
    default: "관리자 페이지 | 찾아줘! 관리자",
  },
  description: "시스템 관리자 전용 페이지입니다.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "관리 시스템",
    description: "접근 권한이 필요합니다.",
    url: "",
    siteName: "",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "관리 시스템",
    description: "접근 권한이 필요합니다.",
    images: [],
  },
};

const layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default layout;
