import { MypageRequestDetailContainer } from "@/components/domain";
import { DetailHeader } from "@/components/layout";

const page = () => {
  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <MypageRequestDetailContainer />
    </>
  );
};

export default page;
