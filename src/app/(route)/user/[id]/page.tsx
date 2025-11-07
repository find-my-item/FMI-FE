"use client";

import { DetailHeader } from "@/components";
import { TabContents, UserHeader } from "./_components";

export default function Page() {
  return (
    <>
      <h1 className="sr-only">타인 프로필</h1>
      <DetailHeader title="프로필">
        <DetailHeader.Menu />
      </DetailHeader>

      <UserHeader nickname="사용자 닉네임" email="asdf@gmail.com" />

      <TabContents />
    </>
  );
}
