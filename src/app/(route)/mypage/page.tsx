"use client";

import { useGetUserMe } from "@/api/fetch/user/api/useGetUsersMe";
import { MyPageIconNav, MyPageMenuSection, MyPageProfile } from "./_components";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { ToastProvider } from "@/providers/ToastProviders";

const page = () => {
  const { data, isLoading, error } = useGetUserMe();
  console.log("data>> ", data);
  const { addToast } = useToast();

  if (isLoading) return <LoadingState />;
  if (error) return addToast("프로필 정보를 불러오는데 실패했어요.", "warning");
  // const data = { result: { email: "asdf@exdlkdfj.com", profileImg: "", nickname: "감자" } };
  return (
    <ToastProvider>
      <div className="flex w-full flex-col">
        {data ? (
          <MyPageProfile
            userData={{
              email: data.result.email,
              profileImg: data.result?.profileImg,
              nickname: data.result.nickname,
            }}
          />
        ) : (
          <MyPageProfile />
        )}

        <MyPageIconNav />

        <MyPageMenuSection />
      </div>
    </ToastProvider>
  );
};

export default page;
