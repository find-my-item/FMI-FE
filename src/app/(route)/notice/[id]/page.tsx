import { NoticeDetailHeader, NoticeDetailView } from "./_components";

interface NoticeDetailProps {
  params: Promise<{ id: string }>;
}

const NoticeDetail = async ({ params }: NoticeDetailProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-col h-base">
      <NoticeDetailHeader />
      <h1 className="sr-only">공지사항 상세</h1>
      <NoticeDetailView />
    </div>
  );
};

export default NoticeDetail;
