"use client";

import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { useEffect } from "react";
import MyPageProfile from "../MyPageProfile/MyPageProfile";
import MyPageIconNav from "../MyPageIconNav/MyPageIconNav";
import MyPageMenuSection from "../MyPageMenuSection/MyPageMenuSection";
import { useGetUsersMe } from "@/api/fetch/user";

const MyPageContainer = ({ hasToken }: { hasToken: boolean }) => {
  const { data, isLoading, error } = useGetUsersMe({ hasToken });
  const { addToast } = useToast();

  useEffect(() => {
    if (error) {
      addToast("프로필 정보를 불러오는데 실패했어요.", "warning");
    }
  }, [error, addToast]);

  if (isLoading) return <LoadingState />;

  const isUserLogin = !!(data && data.result && data.result.nickname);
  return (
    <div className="flex w-full flex-col">
      {isUserLogin ? (
        <MyPageProfile
          userData={{
            email: data.result.email,
            profileImg: data.result.profileImg || "",
            nickname: data.result.nickname,
          }}
        />
      ) : (
        <MyPageProfile />
      )}

      <MyPageIconNav />

      <MyPageMenuSection isUserLogin={isUserLogin} />
    </div>
  );
};

export default MyPageContainer;
