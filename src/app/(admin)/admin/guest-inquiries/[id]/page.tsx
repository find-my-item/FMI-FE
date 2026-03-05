import { DetailHeader } from "@/components/layout";
import { GuestInquiriesDetailView } from "./_components";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <>
      <DetailHeader title="비회원 문의 내역" />
      <h1 className="sr-only">비회원 문의 상세 내역</h1>

      <GuestInquiriesDetailView id={Number(id)} />
    </>
  );
};

export default page;
