import { MypageSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import ActivityFilter from "./_components/ActivityFilter/ActivityFilter";

const page = () => {
  return (
    <>
      <DetailHeader title="내 활동 내역" />
      <h1 className="sr-only">내 활동 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <ActivityFilter />
      </div>
    </>
  );
};

export default page;
