import { CommentForm } from "@/app/(route)/list/[id]/_components";
import { MypageRequestDetailContainer } from "@/components/domain";
import { DetailHeader } from "@/components/layout";

const page = () => {
  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <MypageRequestDetailContainer />
      <CommentForm />
    </>
  );
};

export default page;
