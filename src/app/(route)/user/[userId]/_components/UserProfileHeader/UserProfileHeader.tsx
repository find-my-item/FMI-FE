"use client";

import { DetailHeader } from "@/components/layout";

const UserProfileHeader = () => {
  return (
    <DetailHeader title="프로필">
      <DetailHeader.Menu ariaLabel="더보기 메뉴" />
    </DetailHeader>
  );
};

export default UserProfileHeader;
