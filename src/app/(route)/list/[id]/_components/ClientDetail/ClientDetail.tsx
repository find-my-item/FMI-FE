"use client";

import { CommentList, AddToHomeScreenPWA } from "@/components/domain";
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
import { useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { useAddToHomeScreen } from "@/hooks";

interface ClientDetailProps {
  id: number;
  isLoggedIn: boolean;
}

const ClientDetail = ({ id, isLoggedIn }: ClientDetailProps) => {
  const { addToast } = useToast();
  const { showPrompt, incrementViewCount, closePrompt } = useAddToHomeScreen();

  const { data, isLoading, isError } = useGetDetailPost({ id });
  const { data: commentsData, fetchNextPage } = useGetPostsComments({
    postId: id,
    enabled: isLoggedIn,
  });
  const { handleReplySubmit, isPending } = useHandleReplySubmit(id);
  const { mutate: deleteComment } = useDeleteComment();
  const { handleToggleFavorite } = useToggleCommentLike();

  useEffect(() => {
    if (isError) {
      addToast("게시글 불러오기에 실패했어요", "error");
    }
  }, [isError, addToast]);

  useEffect(() => {
    if (!isLoading && data?.result) {
      incrementViewCount();
    }
  }, [isLoading, data]);

  if (isLoading) return <DetailSkeleton />;
  if (isError || !data?.result) return <DetailSkeleton />;

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

      <div className="flex flex-col h-base">
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

        <PostInputComment postId={id} isLoggedIn={isLoggedIn} />
      </div>

      <AddToHomeScreenPWA isOpen={showPrompt} onClose={closePrompt} />
    </>
  );
};

export default ClientDetail;
