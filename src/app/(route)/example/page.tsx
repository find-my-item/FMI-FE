"use client";

import { Dropdown, Tab } from "@/app/components/common";
import Modal from "@/app/components/common/Modal/ModalLayout";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-[100vh] bg-gray-600 gap-4 flex-col-center">
      {/* Tab */}
      <Tab
        tabs={tabs}
        selected={selectedTab}
        onValueChange={setSelectedTab}
        aria-label={`${tabs.find((tab) => tab.id === selectedTab)?.label || "Tab"}`}
      />
      {/* Dropdown */}
      <Dropdown options={options} onSelect={setSelectedOption} />
      <button
        className="px-4 py-2 border border-gray-300 rounded text-white hover:border-gray-500 hover:text-black mouse-hover"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="p-4 flex-center">
        <h2>Modal Title</h2>
        <p className="h-[100px] flex-center">Modal Content</p>
        <span>Modal Footer</span>
        <button
          className="mt-4 px-4 py-2 border border-gray-300 rounded hover:border-gray-500 hover:text-black mouse-hover"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default page;
