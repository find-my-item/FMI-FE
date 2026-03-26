import { DetailHeader } from "@/components/layout";
import { MypageSearch } from "@/components/domain";
import { MypageInquiriesContent, MypageInquiriesFilter } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <h1 className="sr-only">내 문의 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch searchMode="inquiries" />

        <MypageInquiriesFilter />

        <MypageInquiriesContent />
      </div>
    </>
  );
};

export default page;
