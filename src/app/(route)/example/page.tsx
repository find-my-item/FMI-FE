"use client";

import { Dropdown, Tab, ModalLayout } from "@/components";
import Icon from "@/components/Icon/Icon";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";

const tabs = [
  { key: "1", label: "Tab 1" },
  { key: "2", label: "Tab 2" },
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
  const [confirmModal, setConfirmModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToast();

  return (
    <div className="h-[100vh] w-full gap-6 bg-gray-600 flex-col-center">
      {/* Tab */}
      <Tab
        tabs={tabs}
        selected={selectedTab}
        onValueChange={setSelectedTab}
        aria-label={`${tabs.find((tab) => tab.key === selectedTab)?.label || "Tab"}`}
      />
      {/* Dropdown */}
      <Dropdown options={options} onSelect={setSelectedOption}>
        <span className="text-[16px] font-semibold text-[#525252]">{selectedOption}</span>
        <Icon name="ArrowDown" size={12} />
      </Dropdown>
      <button
        className="rounded border border-gray-300 px-4 py-2 text-white mouse-hover hover:border-gray-500 hover:text-black"
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
          className="mt-4 rounded border border-gray-300 px-4 py-2 mouse-hover hover:border-gray-500 hover:text-black"
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
          className="rounded border border-gray-300 px-4 py-2 text-white mouse-hover hover:border-gray-500 hover:text-black"
          onClick={() => addToast("정보가 정상적으로 처리되었습니다.", "success")}
        >
          Show Success Toast
        </button>
        <button
          className="rounded border border-gray-300 px-4 py-2 text-white mouse-hover hover:border-gray-500 hover:text-black"
          onClick={() => addToast("성공적으로 저장되었습니다!", "warning")}
        >
          Show Warning Toast
        </button>
        <button
          className="rounded border border-gray-300 px-4 py-2 text-white mouse-hover hover:border-gray-500 hover:text-black"
          onClick={() => addToast("에러가 발생했습니다.", "error")}
        >
          Show Error Toast
        </button>
      </div>

      {/* Confirm Modal */}
      <div>
        <button
          className="rounded border border-gray-300 px-4 py-2 text-white mouse-hover hover:border-gray-500 hover:text-black"
          onClick={() => setConfirmModal(true)}
        >
          Open Confirm Modal
        </button>

        <ConfirmModal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          title="Confirm Modal"
          content="안녕하세요 모달입니다."
          onConfirm={() => setConfirmModal(false)}
          onCancel={() => setConfirmModal(false)}
          size="medium"
        />
      </div>
    </div>
  );
};

export default page;
