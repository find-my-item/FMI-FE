import { noticeListObject } from "../_constant/noticeListObject";
import { CommentForm, PostDetail } from "@/app/(route)/list/[id]/_components/index";
import CommentList from "../../../../components/CommentList/CommentList";
import { commentListObject } from "../_constant/commentListObject";

interface NoticeDetailProps {
  params: Promise<{ id: string }>;
}

const NoticeDetail = async ({ params }: NoticeDetailProps) => {
  const { id } = await params;
  const noticeItem = noticeListObject.find((item) => item.id === Number(id));

  if (!noticeItem) return <div className="h-[600px] pt-4">존재하지 않는 공지사항입니다.</div>;

  return (
    <>
      <PostDetail item={noticeItem} type="notice" />
      <CommentList comments={commentListObject} />
      <CommentForm />
    </>
  );
};

export default NoticeDetail;
