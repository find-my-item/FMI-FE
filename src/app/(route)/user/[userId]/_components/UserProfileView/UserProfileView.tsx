"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Tab } from "@/components/domain";
import { useGetUserProfileById } from "@/api/fetch/user";
import UserHeader from "../UserHeader/UserHeader";
import TabContents from "../TabContents/TabContents";
import { USER_TABS } from "../../_types/USER_TABS";
import { useUserProfileTabQuery } from "../../_hooks/useUserProfileTabQuery";

const UserProfileView = () => {
  const { userId } = useParams<{ userId: string }>();

  const { tab, updateTabQuery } = useUserProfileTabQuery();
  const { data, isLoading, isError } = useGetUserProfileById(userId, tab);

  if (isError || !userId) return notFound();

  const profileData = data?.result;

  return (
    <div className="h-base">
      <h1 className="sr-only">{profileData ? `${profileData.nickname} 프로필` : "프로필"}</h1>

      <UserHeader data={profileData} />

      <Tab tabs={USER_TABS} selected={tab} onValueChange={updateTabQuery} aria-label="프로필 탭" />

      <TabContents selectedTab={tab} data={profileData} isLoading={isLoading} />
    </div>
  );
};

export default UserProfileView;
