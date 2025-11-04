"use client";

import { DetailHeader } from "@/components";

const PostDetailTopHeader = () => {
  return (
    <DetailHeader>
      <DetailHeader.Star isActive />
      <DetailHeader.Share />
      <DetailHeader.Menu />
    </DetailHeader>
  );
};

export default PostDetailTopHeader;
