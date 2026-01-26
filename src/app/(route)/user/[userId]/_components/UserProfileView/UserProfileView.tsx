"use client";

import { useState } from "react";
import NotFound from "@/app/not-found";
import { useParams } from "next/navigation";
import { Tab } from "@/components/domain";
import { useGetUserProfileById } from "@/api/fetch/user";
import UserHeader from "../UserHeader/UserHeader";
import TabContents from "../TabContents/TabContents";
import { SelectedTab, USER_TABS } from "../../_types/USER_TABS";

const UserProfileView = () => {
  const { userId } = useParams<{ userId: string }>();
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("post");

  const { data, isLoading, isError } = useGetUserProfileById(userId);

  if (isError || !userId) return <NotFound />;
  const profileData = data?.result;

  return (
    <div className="h-base">
      <h1 className="sr-only">{profileData ? `${profileData.nickname} 프로필` : "프로필"}</h1>

      <UserHeader data={profileData} />

      <Tab
        tabs={USER_TABS}
        selected={selectedTab}
        onValueChange={setSelectedTab}
        aria-label="프로필 탭"
      />

      <TabContents selectedTab={selectedTab} isLoading={isLoading} />
    </div>
  );
};

export default UserProfileView;
