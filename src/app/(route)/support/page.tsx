import { Suspense } from "react";
import { SupportFaqAccordion, SupportSearchForm, SupportTab } from "./_components";

const page = () => {
  return (
    <div className="space-y-[10px] h-base">
      {/* TODO(형준): 기능 개발 시점에서 Suspense 세분화 필요 */}
      <Suspense fallback="">
        <SupportSearchForm />
        <SupportTab />
        <SupportFaqAccordion />
      </Suspense>
    </div>
  );
};

export default page;
