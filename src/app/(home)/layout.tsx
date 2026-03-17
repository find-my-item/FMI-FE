import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "우리 동네 분실물 찾기, 찾아줘!",
  description:
    "가장 빠르고 쉬운 분실물 센터. 경찰청 분실물부터 내 주변 분실물까지, 지도에서 바로 확인해보세요!",
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://fmi-project-s3-bucket.s3.ap-northeast-2.amazonaws.com/9e619169-f_default-share.png",
        width: 1200,
        height: 630,
        alt: "찾아줘!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://fmi-project-s3-bucket.s3.ap-northeast-2.amazonaws.com/9e619169-f_default-share.png",
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
