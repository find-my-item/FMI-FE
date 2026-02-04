"use client";

import { CommentList } from "@/components/domain";
import PostDetail from "../PostDetail/PostDetail";
import PostDetailTopHeader from "../PostDetailTopHeader/PostDetailTopHeader";
import SimilarItemsSection from "../SimilarItemsSection/SimilarItemsSection";
import CommentForm from "../CommentForm/CommentForm";
import { useGetDetailPost } from "@/api/fetch/post/api/useGetDetailPost";
import { commentListObject } from "@/app/(route)/notice/_constant/commentListObject";
import { useGetUserData } from "@/api/fetch/user";

interface ClientDetailProps {
  id: number;
}

const ClientDetail = ({ id }: ClientDetailProps) => {
  const { data, isLoading, isError } = useGetDetailPost({ id });

  // TODO(지권): 추후 게시글 데이터, 유저 데이터 비교 후 상세페이지 옵션 UI 구현
  // const { data: userData } = useGetUserData();

  if (isLoading) return <div className="h-[600px] pt-4">로딩중</div>;
  if (isError || !data?.result) return <div className="h-[600px] pt-4">오류가 발생했습니다.</div>;

  return (
    <>
      <PostDetailTopHeader postId={id} />
      <PostDetail type="find" data={data.result} />
      <CommentList comments={commentListObject} />
      <SimilarItemsSection />
      <CommentForm />
    </>
  );
};

export default ClientDetail;
