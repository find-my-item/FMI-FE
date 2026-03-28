"use client";

import { cn } from "@/utils";
import { useSupportTabQuery, SUPPORT_TABS } from "./_internal";

const SupportTab = () => {
  const { tab, updateTabQuery } = useSupportTabQuery();

  return (
    <div className="flex w-full px-5">
      {SUPPORT_TABS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={cn(
            "flex-1 py-[10px] text-body1-medium text-neutral-normal-default flex-center",
            tab === item.key &&
              "border-b-2 border-brand-normal-default text-body1-semibold text-layout-header-default"
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
