import { NoticeDetailView } from "./_components";

interface NoticeDetailProps {
  params: Promise<{ id: string }>;
}

const NoticeDetail = async ({ params }: NoticeDetailProps) => {
  const { id } = await params;

  return <NoticeDetailView id={Number(id)} />;
};

export default NoticeDetail;
