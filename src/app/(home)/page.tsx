import { BottomSheet, MainKakaoMap, MainSearchHeader } from "./_components";
import type { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { search } = await searchParams;

  const title = search ? `${search} 검색결과` : "우리 동네 분실물 찾기";
  const description = search
    ? `찾아줘에서 ${search}을 찾고 있나요? 우리 동네에서 잃어버린 ${search} 분실물을 찾아보세요!`
    : "가장 빠르고 쉬운 분실물 센터. 경찰청 분실물부터 내 주변 분실물까지, 지도에서 바로 확인해보세요!";

  return {
    title,
    description,
  };
}

const Page = () => {
  return (
    <div className="h-[calc(100dvh-87px)]">
      <MainSearchHeader />
      <Suspense fallback={null}>
        <MainKakaoMap />
      </Suspense>
      <BottomSheet />
    </div>
  );
};

export default Page;
