import { NoticeDetailHeader, NoticeDetailView } from "./_components";

interface NoticeDetailProps {
  params: Promise<{ id: string }>;
}

const NoticeDetail = async ({ params }: NoticeDetailProps) => {
  const { id } = await params;

  return (
    <>
      <NoticeDetailHeader id={Number(id)} />
      <NoticeDetailView id={Number(id)} />
    </>
  );
};

export default NoticeDetail;
