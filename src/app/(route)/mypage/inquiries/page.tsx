import { DetailHeader } from "@/components/layout";
import { MypageRequestFilter, MypageSearch } from "@/components/domain";

const page = () => {
  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <h1 className="sr-only">내 문의 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageRequestFilter status="inquiries" />

        {/* <MypageInquiriesContent /> */}
      </div>
    </>
  );
};

export default page;
