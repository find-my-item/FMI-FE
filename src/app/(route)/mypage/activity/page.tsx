import { MypageSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import ActivityContainer from "./_components/ActivityContainer/ActivityContainer";
import { MOCK_MYPAGE_ACTIVITY } from "@/mock/data";
import { ActivityFilterSection } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="내 활동 내역" />
      <h1 className="sr-only">내 활동 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <ActivityFilterSection />

        <ActivityContainer activityData={MOCK_MYPAGE_ACTIVITY} />
      </div>
    </>
  );
};

export default page;
