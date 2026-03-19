import { DetailHeader } from "@/components/layout";
import { MypageRequestFilter, MypageSearch } from "@/components/domain";
import MypageReportsContent from "./_components/MypageReportsContent/MypageReportsContent";

const page = () => {
  return (
    <>
      <DetailHeader title="내 신고 내역" />
      <h1 className="sr-only">내 신고 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageRequestFilter status="reports" />

        <MypageReportsContent />
      </div>
    </>
  );
};

export default page;
