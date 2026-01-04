"use client";

import { useState } from "react";
import { DetailHeader } from "@/components/layout";
import PostShare from "../PostShare/PostShare";

const PostDetailTopHeader = ({ postId }: { postId: string }) => {
  const [openShareModal, setOpenShareModal] = useState(false);

  return (
    <>
      <DetailHeader>
        <DetailHeader.Star isActive />
        <DetailHeader.Share onClick={() => setOpenShareModal(true)} />
        <DetailHeader.Menu />
      </DetailHeader>

      <PostShare isOpen={openShareModal} onClose={() => setOpenShareModal(false)} postId={postId} />
    </>
  );
};

export default PostDetailTopHeader;
