import { DetailHeader } from "@/components/layout";
import { MypageRequestFilter, MypageRequestList, MypageSearch } from "@/components/domain";
import { MOCK_MYPAGE_INQUIRIES } from "@/mock/MOCK_DATA";

const page = () => {
  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <h1 className="sr-only">내 문의 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageRequestFilter status="inquiries" />

        <MypageRequestList listType="inquiries" data={MOCK_MYPAGE_INQUIRIES} />
      </div>
    </>
  );
};

export default page;
