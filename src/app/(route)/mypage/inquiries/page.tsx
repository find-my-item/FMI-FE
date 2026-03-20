import { DetailHeader } from "@/components/layout";
import { MypageRequestFilter, MypageSearch } from "@/components/domain";
import { useFilterParams } from "@/hooks/domain";
import { useGetUserInquiries } from "@/api/fetch/user";

const page = () => {
  // const { requestStatus } = useFilterParams();

  // const {
  //   data: inquiriesData,
  //   isLoading,
  //   isError,
  // } = useGetUserInquiries({
  //   status: requestStatus,
  // });

  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <h1 className="sr-only">내 문의 내역 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypageRequestFilter status="inquiries" />

        <MypageInquiriesContent />
      </div>
    </>
  );
};

export default page;
