"use client";

import { CommentList } from "@/components/domain";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { useGetDetailPost } from "@/api/fetch/post";
import PostDetail from "../PostDetail/PostDetail";
import PostDetailTopHeader from "../PostDetailTopHeader/PostDetailTopHeader";
import SimilarItemsSection from "../SimilarItemsSection/SimilarItemsSection";
import CommentForm from "../CommentForm/CommentForm";
import { MOCK_COMMENT_LIST_DATA } from "@/mock/data";
import { ErrorSimilarSection } from "../_internal";

interface ClientDetailProps {
  id: number;
}

const ClientDetail = ({ id }: ClientDetailProps) => {
  const { data, isLoading, isError } = useGetDetailPost({ id });

  if (isLoading) return <div className="h-[600px] pt-4">로딩중</div>;
  if (isError || !data?.result) return <div className="h-[600px] pt-4">오류가 발생했습니다.</div>;

  return (
    <>
      <PostDetailTopHeader postId={id} />
      <PostDetail type="find" data={data.result} />
      <CommentList comments={MOCK_COMMENT_LIST_DATA} />
      <ErrorBoundary fallback={<ErrorSimilarSection postId={id} />}>
        <SimilarItemsSection postId={id} />
      </ErrorBoundary>
      <CommentForm />
    </>
  );
};

export default ClientDetail;
