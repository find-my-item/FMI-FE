"use client";

import { Filter } from "@/components/common";
import { useState } from "react";
import { ACTIVITY_FILTER } from "../../_constants/ACTIVITY_FILTER";
import ActivityBottomSheet from "../ActivityBottomSheet/ActivityBottomSheet";

const ActivityFilter = () => {
  const [isBottomSheet, setIsBottomSheet] = useState<{ isOpen: boolean; mode: "Date" | "Type" }>({
    isOpen: false,
    mode: "Date",
  });

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>
      {ACTIVITY_FILTER.map((item) => (
        <Filter
          key={item.name}
          ariaLabel={item.label}
          icon={item.icon}
          onSelected={false}
          onClick={() => setIsBottomSheet({ isOpen: true, mode: item.name })}
          iconPosition={item.iconPosition}
        >
          {item.label}
        </Filter>
      ))}

      {isBottomSheet.isOpen && (
        <ActivityBottomSheet
          mode={isBottomSheet.mode}
          isOpen={isBottomSheet.isOpen}
          onClose={() => setIsBottomSheet((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </section>
  );
};

export default ActivityFilter;
