import { Suspense } from "react";
import { ProfileEditSection } from "@/components/domain";

const page = () => {
  return (
    <Suspense fallback={null}>
      <ProfileEditSection />
    </Suspense>
  );
};

export default page;
