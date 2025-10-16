"use client";

import DetailHeader from "@/components/DetailHeader/DetailHeader";

const PostDetailTopHeader = () => {
  return (
    <DetailHeader>
      <div className="flex gap-[23.5px]">
        <DetailHeader.Star isActive />
        <DetailHeader.Share />
        <DetailHeader.Menu />
      </div>
    </DetailHeader>
  );
};

export default PostDetailTopHeader;
