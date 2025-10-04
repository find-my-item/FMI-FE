import { customerListObject } from "../../_constant/customerListObject";
import PostDetail from "../../_components/PostDetail";
import CommentList from "../../_components/CommentList";
import { commentListObject } from "../../_constant/commentListObject";

interface CustomerDetailProps {
  params: Promise<{ id: string }>;
}

const CustomerDetail = async ({ params }: CustomerDetailProps) => {
  const { id } = await params;
  const customerItem = customerListObject.find((item) => item.id === Number(id));

  if (!customerItem) return <div className="h-[600px] pt-4">존재하지 않는 문의 내역입니다.</div>;

  return (
    <>
      <PostDetail item={customerItem} type="notice" />
      <CommentList comments={commentListObject} />
    </>
  );
};

export default CustomerDetail;
