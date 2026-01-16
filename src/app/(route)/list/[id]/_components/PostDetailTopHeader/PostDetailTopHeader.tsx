"use client";

import { useState } from "react";
import { DetailHeader } from "@/components/layout";
import PostShare from "../PostShare/PostShare";
import PostOptionBox from "../PostOptionBox/PostOptionBox";

const PostDetailTopHeader = ({ postId }: { postId: number }) => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);

  return (
    <>
      <DetailHeader>
        <DetailHeader.Star isActive ariaLabel="게시글 즐겨찾기" />
        <DetailHeader.Share onClick={() => setOpenShareModal(true)} ariaLabel="게시글 공유" />
        <div className="relative inline-flex items-center">
          <DetailHeader.Menu
            onClick={() => setOpenOptionModal((v) => !v)}
            ariaLabel="게시글 메뉴"
          />
          <PostOptionBox
            open={openOptionModal}
            onClose={() => setOpenOptionModal(false)}
            postId={postId}
          />
        </div>
      </DetailHeader>

      <PostShare isOpen={openShareModal} onClose={() => setOpenShareModal(false)} postId={postId} />
    </>
  );
};

export default PostDetailTopHeader;
