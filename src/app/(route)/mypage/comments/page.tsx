import { DetailHeader } from "@/components/layout";
import { MypageCommentsContent, MypageCommentsFilterSection } from "./_components";
import { MypageSearch } from "@/components/domain";
import { ErrorBoundary } from "@/app/ErrorBoundary";

const page = () => {
  return (
    <>
      <DetailHeader title="내가 쓴 댓글" />
      <h1 className="sr-only">내가 쓴 댓글 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageCommentsFilterSection />

        <ErrorBoundary toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
          <MypageCommentsContent />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default page;
