"use client";

import { useGetUserMe } from "@/api/fetch/user/api/useGetUserMe";
import { MyPageIconNav, MyPageMenuSection, MyPageProfile } from "./_components";
import { LoadingState } from "@/components/state";

const page = () => {
  const { data, isLoading } = useGetUserMe();
  console.log("data>> ", data);

  if (isLoading) return <LoadingState />;

  return (
    <div className="flex w-full flex-col">
      <MyPageProfile email="abc@gmail.com" userName="사용자 닉네임" />

      <MyPageIconNav />

      <MyPageMenuSection />
    </div>
  );
};

export default page;
