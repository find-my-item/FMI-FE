import { LIST_ITEM_MOCK } from "../_constants/LIST_ITEM_MOCK";
import { PostDetail, SimilarItemsSection, CommentForm } from "./_components";
import { commentListObject } from "../../notice/_constant/commentListObject";
import { CommentList } from "@/components/domain";
import PostDetailTopHeader from "./_components/PostDetailTopHeader/PostDetailTopHeader";

interface ListDetailProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: ListDetailProps) => {
  const { id } = await params;
  const listObject = LIST_ITEM_MOCK.find((item) => item.id === Number(id));

  if (!listObject) return <div className="h-[600px] pt-4">존재하지 않는 상세페이지입니다.</div>;

  return (
    <>
      <PostDetailTopHeader postId={id} />
      <PostDetail item={listObject} type="find" />
      <CommentList comments={commentListObject} />
      <SimilarItemsSection />
      <CommentForm />
    </>
  );
};

export default page;
