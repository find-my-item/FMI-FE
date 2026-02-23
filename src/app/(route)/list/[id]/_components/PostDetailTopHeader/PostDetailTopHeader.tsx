"use client";

import { useState } from "react";
import { DetailHeader } from "@/components/layout";
import PostShare from "../PostShare/PostShare";
import PostActionMenu from "../PostActionMenu/PostActionMenu";
import {
  HeaderMenu,
  HeaderShare,
  HeaderStar,
} from "@/components/layout/DetailHeader/DetailHeaderParts";
import { PostActionData } from "../../_types/PostActionType";

interface PostDetailTopHeaderProps {
  postId: number;
  postData: PostActionData;
}

const PostDetailTopHeader = ({ postId, postData }: PostDetailTopHeaderProps) => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);

  return (
    <>
      <div className="relative">
        <DetailHeader>
          <HeaderStar isActive={postData.favoriteStatus} ariaLabel="게시글 즐겨찾기" />
          <HeaderShare onClick={() => setOpenShareModal(true)} ariaLabel="게시글 공유" />
          <HeaderMenu onClick={() => setOpenOptionModal((v) => !v)} ariaLabel="게시글 메뉴" />
        </DetailHeader>

        <PostActionMenu
          open={openOptionModal}
          onClose={() => setOpenOptionModal(false)}
          postId={postId}
          postData={postData}
        />
      </div>

      <PostShare isOpen={openShareModal} onClose={() => setOpenShareModal(false)} postId={postId} />
    </>
  );
};

export default PostDetailTopHeader;
