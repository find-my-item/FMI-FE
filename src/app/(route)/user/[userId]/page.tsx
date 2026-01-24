"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tab } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { useGetUserProfileById } from "@/api/fetch/user/api/useGetUserProfileById";
import { TabContents, UserHeader } from "./_components";
import { USER_TABS } from "./_types/USER_TABS";
import NotFound from "@/app/not-found";

type SelectedTab = (typeof USER_TABS)[number]["key"];

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("post");
  const { userId } = useParams<{ userId: string }>();

  const { data: profileData } = useGetUserProfileById(userId);

  if (!profileData) return <NotFound />;

  return (
    <div className="h-base">
      <DetailHeader title="프로필">
        <DetailHeader.Menu ariaLabel="더보기 메뉴" />
      </DetailHeader>
      <h1 className="sr-only">{profileData.result.nickname} 프로필</h1>

      <UserHeader data={profileData.result} />

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
