import { DetailHeader } from "@/components/layout";
import { MypageSearch } from "@/components/domain";
import { MypageReportsFilter, MypageReportsList } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="내 신고 내역" />
      <h1 className="sr-only">내 신고 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageReportsFilter />

        <MypageReportsList />
      </div>
    </>
  );
};

export default page;
