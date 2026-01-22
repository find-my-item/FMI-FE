import { MypageRequestFilter, MypageSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";

const page = () => {
  return (
    <>
      <DetailHeader title="즐겨찾기 목록" />
      <h1 className="sr-only">즐겨찾기 목록 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />
        <MypageRequestFilter status="reports" />
      </div>
    </>
  );
};

export default page;
