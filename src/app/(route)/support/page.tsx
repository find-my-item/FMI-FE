import { Suspense } from "react";
import { SupportFaqAccordion, SupportTab } from "./_components";

const page = () => {
  return (
    <div className="space-y-[10px] h-base">
      <Suspense fallback="">
        <SupportTab />
        <SupportFaqAccordion />
      </Suspense>
    </div>
  );
};

export default page;
