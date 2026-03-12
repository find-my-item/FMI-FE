"use client";

import { CommentList } from "@/components/domain";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { useGetDetailPost } from "@/api/fetch/post";
import {
  useDeleteComment,
  useGetPostsComments,
  useGetRepliesPostsComments,
} from "@/api/fetch/comment";
import PostDetail from "../PostDetail/PostDetail";
import PostDetailTopHeader from "../PostDetailTopHeader/PostDetailTopHeader";
import SimilarItemsSection from "../SimilarItemsSection/SimilarItemsSection";
import PostInputComment from "../PostInputComment/PostInputComment";
import { DetailSkeleton, ErrorSimilarSection } from "../_internal";
import { useHandleReplySubmit } from "../../_hooks/useHandleReplySubmit/useHandleReplySubmit";
import { useToggleCommentLike } from "../../_hooks/usePostCommentLike/usePostCommentLike";

interface ClientDetailProps {
  id: number;
  isLoggedIn: boolean;
}

const ClientDetail = ({ id, isLoggedIn }: ClientDetailProps) => {
  const { data, isLoading, isError } = useGetDetailPost({ id });
  const { data: commentsData, fetchNextPage } = useGetPostsComments({
    postId: id,
    enabled: isLoggedIn,
  });
  const { handleReplySubmit, isPending } = useHandleReplySubmit(id);
  const { mutate: deleteComment } = useDeleteComment();
  const { handleToggleFavorite } = useToggleCommentLike();

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

      <div className="h-base">
        <PostDetail type="find" data={data.result} />

        <CommentList
          postId={id}
          comments={commentsData}
          onSubmit={handleReplySubmit}
          isPending={isPending}
          isLoggedIn={isLoggedIn}
          useFetchReplies={useGetRepliesPostsComments}
          onDeleteComment={deleteComment}
          onFavoriteComment={(commentId, isLike, queryKey) =>
            handleToggleFavorite({ commentId, isLike, queryKey })
          }
          onCommentLoadMore={() => fetchNextPage()}
        />

        <ErrorBoundary fallback={<ErrorSimilarSection postId={id} />}>
          <SimilarItemsSection postId={id} />
        </ErrorBoundary>
      </div>

      <PostInputComment postId={id} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default ClientDetail;
