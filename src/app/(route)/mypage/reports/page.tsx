import { DetailHeader } from "@/components/layout";
import { MypageRequestFilter, MypageRequestList, MypageSearch } from "@/components/domain";
import { MOCK_MYPAGE_REPORTS } from "@/mock/MOCK_DATA";

const page = () => {
  return (
    <>
      <DetailHeader title="내 신고 내역" />
      <h1 className="sr-only">내 신고 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageRequestFilter status="reports" />

        <MypageRequestList listType="reports" data={MOCK_MYPAGE_REPORTS} />
      </div>
    </>
  );
};

export default page;
