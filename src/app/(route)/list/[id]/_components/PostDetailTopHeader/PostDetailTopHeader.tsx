"use client";

import { useState } from "react";
import { DetailHeader } from "@/components/layout";
import PostShare from "../PostShare/PostShare";

const PostDetailTopHeader = ({ postId }: { postId: string }) => {
  const [openShareModal, setOpenShareModal] = useState(false);

  return (
    <>
      <DetailHeader>
        <DetailHeader.Star isActive ariaLabel="게시글 즐겨찾기" />
        <DetailHeader.Share onClick={() => setOpenShareModal(true)} ariaLabel="게시글 공유" />
        <DetailHeader.Menu ariaLabel="게시글 메뉴" />
      </DetailHeader>

      <PostShare isOpen={openShareModal} onClose={() => setOpenShareModal(false)} postId={postId} />
    </>
  );
};

export default PostDetailTopHeader;
