"use client";

import { Tab } from "@/app/components/common";
import { useState } from "react";

const tabs = [
  { id: "1", label: "Tab 1" },
  { id: "2", label: "Tab 2" },
];

// 공용 컴포넌트 예시 페이지
const page = () => {
  const [selected, setSelected] = useState("1");
  return (
    <div className="w-full h-[100vh] bg-gray-600 gap-4 flex-col-center">
      <Tab
        tabs={tabs}
        selected={selected}
        onValueChange={setSelected}
        aria-label={`${tabs.find((tab) => tab.id === selected)?.label || "Tab"}`}
      />
    </div>
  );
};

export default page;
