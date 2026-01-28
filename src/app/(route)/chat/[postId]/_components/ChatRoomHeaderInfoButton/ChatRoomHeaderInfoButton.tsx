"use client";

import { ConfirmModal, Icon } from "@/components/common";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { INFO_OPTIONS } from "./INFO_OPTIONS";

const ChatRoomHeaderInfoButton = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleOptionClick = (value: "report" | "leave") => {
    if (value === "leave") {
      setModalOpen(true);
    } else {
      router.push(`/chat/1/report`);
    }
  };

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          className="flex h-10 w-10 items-center justify-end"
          aria-label="채팅방 메뉴 열기 버튼"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icon name="Information" size={18} />
        </button>
        {open && (
          <ul className="absolute right-0 top-10 z-10 m-0 list-none p-0" role="menu">
            {INFO_OPTIONS.map((option, i) => (
              <li key={option.value} className="m-0 p-0" role="menuitem">
                <button
                  type="button"
                  aria-label={option.label}
                  onClick={() => handleOptionClick(option.value)}
                  className={cn(
                    "glass-card w-full text-nowrap border border-white bg-white/50 px-7 py-4 text-left text-h3-medium transition-colors hover:bg-white/70",
                    option.value === "report"
                      ? "text-neutral-normal-default"
                      : "text-system-warning",
                    i === 0 ? "rounded-t-[20px]" : "rounded-b-[20px]"
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="채팅방을 나가시겠어요?"
        content="채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요, 채팅방에서 나가시겠어요?"
        onConfirm={() => router.back()}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default ChatRoomHeaderInfoButton;
