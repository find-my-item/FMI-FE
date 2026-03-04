"use client";

import { CommentList } from "@/components/domain";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { useGetDetailPost } from "@/api/fetch/post";
import { useGetPostsComments } from "@/api/fetch/comment";
import PostDetail from "../PostDetail/PostDetail";
import PostDetailTopHeader from "../PostDetailTopHeader/PostDetailTopHeader";
import SimilarItemsSection from "../SimilarItemsSection/SimilarItemsSection";
import { MOCK_COMMENT_LIST_DATA } from "@/mock/data";
import { DetailSkeleton, ErrorSimilarSection } from "../_internal";
import PostInputComment from "../PostInputComment/PostInputComment";

interface ClientDetailProps {
  id: number;
}

const ClientDetail = ({ id }: ClientDetailProps) => {
  const { data, isLoading, isError } = useGetDetailPost({ id });
  const { data: commentsData } = useGetPostsComments({ postId: id });

  if (isLoading) return <DetailSkeleton />;
  if (isError || !data?.result) return <div className="pt-4 h-base">오류가 발생했습니다.</div>;

  const { isMine, postUserInformation } = data.result;
  console.log(commentsData);

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
      <CommentList comments={MOCK_COMMENT_LIST_DATA} />
      <ErrorBoundary fallback={<ErrorSimilarSection postId={id} />}>
        <SimilarItemsSection postId={id} />
      </ErrorBoundary>
      <PostInputComment />
    </>
  );
};

export default ClientDetail;
