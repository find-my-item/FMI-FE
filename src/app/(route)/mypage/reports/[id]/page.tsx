import { PostInputComment } from "@/app/(route)/list/[id]/_components";
import { DetailHeader } from "@/components/layout";
import { MypageReportsIdContainer } from "./_components";

interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  const reportId = Number(params.id);

  return (
    <>
      <DetailHeader title="내 신고 내역" />
      <MypageReportsIdContainer id={reportId} />
      <PostInputComment postId={reportId} isLoggedIn={false} />
    </>
  );
};

export default page;
