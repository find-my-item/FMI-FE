import type { Metadata } from "next";
import { Suspense } from "react";
import { DefaultListView } from "./_components";

interface PageProps {
  searchParams: Promise<{ type?: string; keyword?: string }>;
}

const getPostType = (type?: string) => {
  if (type === "lost") return "분실한";
  if (type === "found") return "발견된";
  return "";
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { type, keyword } = await searchParams;

  let title = "";
  let description = "";

  const postType = getPostType(type);

  if (!!keyword) {
    title = `${keyword} 검색결과 | 찾아줘!`;
    description = `찾아줘에서 ${keyword}을 찾고 있나요? 우리 동네에서 잃어버린 ${keyword} 분실물을 찾아보세요!`;
  } else if (!!type) {
    title = `${postType} 물건 리스트`;
    description = `${postType} 물건을 한눈에 확인해보세요! 우리 동네 분실물들이 이곳에 모여 있어요.`;
  }

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
