"use client";

import { DetailHeader } from "@/components/layout";
import { DetailHeaderMenu } from "@/components/layout/DetailHeader/DetailHeaderParts";

const UserProfileDetailHeader = () => {
  return (
    <DetailHeader title="프로필">
      <DetailHeaderMenu ariaLabel="더보기 메뉴" />
    </DetailHeader>
  );
};

export default UserProfileDetailHeader;
