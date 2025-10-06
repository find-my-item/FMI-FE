import React from "react";
import CommentList from "../../notice/_components/CommentList";
import { commentListObject } from "../../notice/_constant/commentListObject";
import { itemListObject } from "../_constants/listItem";
import PostDetail from "../_components/PostDetail/PostDetail";

interface ListDetailProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: ListDetailProps) => {
  const { id } = await params;
  const listObject = itemListObject.find((item) => item.id === Number(id));

  if (!listObject) return <div className="h-[600px] pt-4">존재하지 않는 공지사항입니다.</div>;

  return (
    <>
      <PostDetail item={listObject} type="find" />
      <CommentList comments={commentListObject} />
    </>
  );
};

export default page;
