"use client";

import { Dropdown, Tab, ModalLayout } from "@/components";
import Icon from "@/components/Icon/Icon";
import { useToast } from "@/context/ToastContext";
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
  const { addToast } = useToast();

  return (
    <div className="w-full h-[100vh] bg-gray-600 gap-6 flex-col-center">
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
      <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)} className="p-4 flex-center">
        <h2>Modal Title</h2>
        <p className="h-[100px] flex-center">Modal Content</p>
        <span>Modal Footer</span>
        <button
          className="mt-4 px-4 py-2 border border-gray-300 rounded hover:border-gray-500 hover:text-black mouse-hover"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </ModalLayout>

      <Icon name="ArrowDown" size={24} />
      <Icon name="ArrowDown" size={32} />
      <Icon name="ArrowDown" size={40} />

      {/* Toast */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 border border-gray-300 rounded text-white hover:border-gray-500 hover:text-black mouse-hover"
          onClick={() => addToast("정보가 정상적으로 처리되었습니다.", "info")}
        >
          Show info Toast
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded text-white hover:border-gray-500 hover:text-black mouse-hover"
          onClick={() => addToast("성공적으로 저장되었습니다!", "success")}
        >
          Show Success Toast
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded text-white hover:border-gray-500 hover:text-black mouse-hover"
          onClick={() => addToast("에러가 발생했습니다.", "error")}
        >
          Show Error Toast
        </button>
      </div>
    </div>
  );
};

export default page;
