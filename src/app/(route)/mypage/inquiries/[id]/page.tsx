import { DetailHeader } from "@/components/layout";
import { MypageInquiriesIdContainer } from "./_components";
import InquiryInputComment from "./_components/InquiryInputComment/InquiryInputComment";

interface PageProps {
  params: { id: string };
}

const page = ({ params }: PageProps) => {
  const inquiryId = Number(params.id);

  return (
    <>
      <DetailHeader title="내 문의 내역" />
      <MypageInquiriesIdContainer id={inquiryId} />
      <InquiryInputComment id={inquiryId} />
    </>
  );
};

export default page;
