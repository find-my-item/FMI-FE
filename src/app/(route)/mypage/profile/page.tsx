"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ProfileEditSection } from "@/components/domain";

const page = () => {
  const router = useRouter();

  return (
    <Suspense fallback={null}>
      <ProfileEditSection onSuccess={() => router.replace("/mypage")} />
    </Suspense>
  );
};

export default page;
