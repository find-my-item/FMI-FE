import { PostInputComment } from "@/app/(route)/list/[id]/_components";
import { MypageRequestDetailContainer } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { MypageInquiriesIdContainer } from "./_components";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const inquiryId = Number(id);

  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <MypageInquiriesIdContainer id={inquiryId} />
      <PostInputComment postId={123} isLoggedIn={false} />
    </>
  );
};

export default page;
