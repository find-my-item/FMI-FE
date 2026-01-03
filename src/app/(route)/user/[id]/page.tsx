"use client";

import { DetailHeader } from "@/components";
import { TabContents, UserHeader } from "./_components";

const data = {
  nickname: "사용자 닉네임",
  email: "asdf@gmail.com",
};

const Page = () => {
  return (
    <>
      <DetailHeader title="프로필">
        <DetailHeader.Menu />
      </DetailHeader>
      <h1 className="sr-only">타인 프로필</h1>

      <UserHeader nickname={data.nickname} email={data.email} />

      <TabContents />
    </>
  );
};

export default Page;
