import { Suspense } from "react";
import { DetailHeader } from "@/components/layout";
import { ProfileEditSection } from "@/components/domain";

const page = () => {
  return (
    <Suspense fallback={null}>
      <DetailHeader title="프로필 설정" />
      <ProfileEditSection />
    </Suspense>
  );
};

export default page;
