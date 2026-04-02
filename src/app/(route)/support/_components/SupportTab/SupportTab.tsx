"use client";

import { cn } from "@/utils";
import { useSupportTabQuery, SUPPORT_TABS } from "./_internal";

// TODO(형준): 디자인 토큰 반영
const SupportTab = () => {
  const { tab, updateTabQuery } = useSupportTabQuery();

  return (
    <div className="flex w-full border-b border-divider-default px-5">
      {SUPPORT_TABS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={cn(
            "h-[60px] flex-1 text-h3-semibold flex-center",
            tab === item.key ? "border-b-2 border-[#1EB87B] text-[#1EB87B]" : "text-[#ADADAD]"
          )}
          onClick={() => updateTabQuery(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SupportTab;
