"use client";

import { useState } from "react";
import NotFound from "@/app/not-found";
import { useParams } from "next/navigation";
import { Tab } from "@/components/domain";
import UserHeader from "../UserHeader/UserHeader";
import TabContents from "../TabContents/TabContents";
import { useGetUserProfileById } from "@/api/fetch/user";
import { USER_TABS } from "../../_types/USER_TABS";

type SelectedTab = (typeof USER_TABS)[number]["key"];

const UserProfileView = () => {
  const { userId } = useParams<{ userId: string }>();
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("post");

  const { data } = useGetUserProfileById(userId);

  const profileData = data?.result;
  if (!profileData) return <NotFound />;

  return (
    <div className="h-base">
      <h1 className="sr-only">{profileData.nickname} 프로필</h1>

      <UserHeader data={profileData} />

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

export default UserProfileView;
