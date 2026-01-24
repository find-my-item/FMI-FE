"use client";

import { useState } from "react";
import { Tab } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { TabContents, UserHeader } from "./_components";
import { USER_TABS } from "./_types/USER_TABS";
import { useGetUserData } from "@/api/fetch/user";
import { useGetUserProfileById } from "@/api/fetch/user/api/useGetUserProfileById";

const data = {
  nickname: "사용자 닉네임",
  email: "asdf@gmail.com",
};

type SelectedTab = (typeof USER_TABS)[number]["key"];

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("post");
  const { data: myData } = useGetUserData();
  console.log(myData);

  const { data: profileData } = useGetUserProfileById("5");
  console.log(profileData);

  return (
    <div className="h-base">
      <DetailHeader title="프로필">
        <DetailHeader.Menu ariaLabel="더보기 메뉴" />
      </DetailHeader>
      <h1 className="sr-only">타인 프로필</h1>

      <UserHeader data={data} />

      <Tab
        tabs={USER_TABS}
        selected={selectedTab}
        onValueChange={setSelectedTab}
        aria-label="프로필 탭"
      />

      <TabContents selectedTab={selectedTab} />
    </div>
  );
};

export default Page;
