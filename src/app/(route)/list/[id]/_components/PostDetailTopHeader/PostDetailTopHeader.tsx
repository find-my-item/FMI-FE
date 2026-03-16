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
import { useToggleFavorite } from "../../_hooks/useToggleFavorite";
import { useClickOutside } from "@/hooks";

interface PostDetailTopHeaderProps {
  postId: number;
  postData: PostActionData;
}

const PostDetailTopHeader = ({ postId, postData }: PostDetailTopHeaderProps) => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);

  const { handleToggleFavorite, isPending } = useToggleFavorite({ postId });
  const ref = useClickOutside(() => setOpenOptionModal(false));

  return (
    <>
      <div className="sticky right-0 top-0 z-10 mx-auto">
        <DetailHeader>
          <HeaderStar
            disabled={isPending}
            isActive={postData.favoriteStatus}
            onClick={() => handleToggleFavorite(postData.favoriteStatus)}
            ariaLabel="게시글 즐겨찾기"
          />
          <HeaderShare onClick={() => setOpenShareModal(true)} ariaLabel="게시글 공유" />
          <div ref={ref} className="relative flex items-center">
            <HeaderMenu onClick={() => setOpenOptionModal((v) => !v)} ariaLabel="게시글 메뉴" />
            <PostActionMenu
              open={openOptionModal}
              onClose={() => setOpenOptionModal(false)}
              postId={postId}
              postData={postData}
            />
          </div>
        </DetailHeader>
      </div>

      <PostShare isOpen={openShareModal} onClose={() => setOpenShareModal(false)} postId={postId} />
    </>
  );
};

export default PostDetailTopHeader;
