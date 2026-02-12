"use client";

import { useState } from "react";
import { DetailHeader } from "@/components/layout";
import PostShare from "../PostShare/PostShare";
import PostActionMenu from "../PostActionMenu/PostActionMenu";
import {
  DetailHeaderMenu,
  DetailHeaderShare,
  DetailHeaderStar,
} from "@/components/layout/DetailHeader/DetailHeaderParts";

const PostDetailTopHeader = ({ postId }: { postId: number }) => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);

  return (
    <>
      <div className="relative">
        <DetailHeader>
          <DetailHeaderStar isActive ariaLabel="게시글 즐겨찾기" />
          <DetailHeaderShare onClick={() => setOpenShareModal(true)} ariaLabel="게시글 공유" />
          <DetailHeaderMenu onClick={() => setOpenOptionModal((v) => !v)} ariaLabel="게시글 메뉴" />
        </DetailHeader>

        <PostActionMenu
          open={openOptionModal}
          onClose={() => setOpenOptionModal(false)}
          postId={postId}
        />
      </div>

      <PostShare isOpen={openShareModal} onClose={() => setOpenShareModal(false)} postId={postId} />
    </>
  );
};

export default PostDetailTopHeader;
