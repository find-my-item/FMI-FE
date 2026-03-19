import { BottomSheet, MainKakaoMap, MainSearchHeader } from "./_components";
import type { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { search } = await searchParams;

  const title = `${search} 검색결과`;
  const description = `찾아줘에서 ${search}을 찾고 있나요?우리 동네에서 잃어버린 ${search} 분실물을 찾아보세요!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

const Page = () => {
  return (
    <div className="h-[calc(100dvh-87px)]">
      <MainSearchHeader />
      <MainKakaoMap />
      <BottomSheet />
    </div>
  );
};

export default Page;
