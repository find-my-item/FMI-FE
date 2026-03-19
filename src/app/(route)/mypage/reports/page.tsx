import { DetailHeader } from "@/components/layout";
import { MypageRequestFilter, MypageRequestList, MypageSearch } from "@/components/domain";
import { useFilterParams } from "@/hooks/domain";
import { useGetUserReports } from "@/api/fetch/user";

const page = () => {
  const { requestStatus } = useFilterParams();

  const {
    data: reportsData,
    isLoading,
    isError,
  } = useGetUserReports({
    status: requestStatus,
  });

  return (
    <>
      <DetailHeader title="내 신고 내역" />
      <h1 className="sr-only">내 신고 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageRequestFilter status="reports" />

        <MypageRequestList
          listType="reports"
          data={reportsData ?? []}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
};

export default page;
