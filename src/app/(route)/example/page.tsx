"use client";

import { Dropdown, Tab } from "@/app/components/common";
import { useState } from "react";

const tabs = [
  { id: "1", label: "Tab 1" },
  { id: "2", label: "Tab 2" },
];

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

// 공용 컴포넌트 예시 페이지
const page = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedOption, setSelectedOption] = useState("1");
  return (
    <div className="w-full h-[100vh] bg-gray-600 gap-4 flex-col-center">
      <Tab
        tabs={tabs}
        selected={selectedTab}
        onValueChange={setSelectedTab}
        aria-label={`${tabs.find((tab) => tab.id === selectedTab)?.label || "Tab"}`}
      />
      <Dropdown options={options} onSelect={setSelectedOption} />
    </div>
  );
};

export default page;
