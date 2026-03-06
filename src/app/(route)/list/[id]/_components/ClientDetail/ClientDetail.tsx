"use client";

import { CommentList } from "@/components/domain";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { useGetDetailPost } from "@/api/fetch/post";
import { useGetPostsComments } from "@/api/fetch/comment";
import PostDetail from "../PostDetail/PostDetail";
import PostDetailTopHeader from "../PostDetailTopHeader/PostDetailTopHeader";
import SimilarItemsSection from "../SimilarItemsSection/SimilarItemsSection";
import PostInputComment from "../PostInputComment/PostInputComment";
import { DetailSkeleton, ErrorSimilarSection } from "../_internal";
import { useHandleReplySubmit } from "../../_hooks/useHandleReplySubmit/useHandleReplySubmit";

interface ClientDetailProps {
  id: number;
}

const ClientDetail = ({ id }: ClientDetailProps) => {
  const { data, isLoading, isError } = useGetDetailPost({ id });
  const { data: commentsData } = useGetPostsComments({ postId: id });
  const { handleReplySubmit, isPending } = useHandleReplySubmit(id);

  if (isLoading) return <DetailSkeleton />;
  if (isError || !data?.result) return <div className="pt-4 h-base">오류가 발생했습니다.</div>;

  const { isMine, postUserInformation } = data.result;

  return (
    <>
      <PostDetailTopHeader
        postId={id}
        postData={{
          isMine,
          writerId: postUserInformation.userId,
          favoriteStatus: data.result.favoriteStatus,
          postStatus: data.result.postStatus,
        }}
      />

      <PostDetail type="find" data={data.result} />

      <CommentList
        postId={id}
        comments={commentsData?.result}
        onSubmit={handleReplySubmit}
        isPending={isPending}
      />

      <ErrorBoundary fallback={<ErrorSimilarSection postId={id} />}>
        <SimilarItemsSection postId={id} />
      </ErrorBoundary>

      <PostInputComment postId={id} />
    </>
  );
};

export default ClientDetail;
