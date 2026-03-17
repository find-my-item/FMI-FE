import type { Metadata } from "next";
import { Suspense } from "react";
import { DefaultListView } from "./_components";

type PostType = "lost" | "found";

const getPostType = (type?: string): PostType => {
  return type === "lost" ? "lost" : "found";
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { type?: string };
}): Promise<Metadata> {
  const postType = getPostType(searchParams.type);
  const label = postType === "lost" ? "분실한" : "발견된";

  const title = `${label} 물건 리스트`;
  const description = `${label} 물건을 한눈에 확인해보세요! 우리 동네 분실물들이 이곳에 모여 있어요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

const Page = () => {
  return (
    <Suspense fallback={null}>
      <DefaultListView />
    </Suspense>
  );
};

export default Page;
