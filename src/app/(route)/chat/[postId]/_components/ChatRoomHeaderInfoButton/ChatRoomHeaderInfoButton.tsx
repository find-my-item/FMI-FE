"use client";

import { ConfirmModal, Icon } from "@/components/common";
import { ReportModal } from "@/components/domain";
import { cn } from "@/utils";
import { useState } from "react";
import { INFO_OPTIONS } from "./INFO_OPTIONS";
import useLeaveChatRoom from "@/api/fetch/chatRoom/api/useLeaveChatRoom";
import { useClickOutside } from "@/hooks";
import { InfoButtonOptionValue } from "./InfoButtonOptionValueTypes";

const MenuItem = ({
  chatMenuOpen,
  onOptionClick,
}: {
  chatMenuOpen: boolean;
  onOptionClick: (value: InfoButtonOptionValue) => void;
}) => {
  if (!chatMenuOpen) return null;

  return (
    <ul className="absolute right-0 top-10 z-10 m-0 list-none p-0" role="menu">
      {INFO_OPTIONS.map(({ value, label, textColor, position }) => {
        return (
          <li key={value} role="menuitem">
            <button
              type="button"
              aria-label={label}
              onClick={() => onOptionClick(value)}
              className={cn(
                "glass-card w-full text-nowrap border border-white bg-white/50 px-7 py-4 text-left text-h3-medium transition-colors hover:bg-white/70",
                textColor,
                position === "first" ? "rounded-t-[20px]" : "rounded-b-[20px]"
              )}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const ChatRoomHeaderInfoButton = ({ roomId }: { roomId: number }) => {
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [leaveChatRoomModalOpen, setLeaveChatRoomModalOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const containerRef = useClickOutside(() => setChatMenuOpen(false));
  const { mutate: leaveChatRoom } = useLeaveChatRoom(roomId);

  const handleOptionClick = (value: InfoButtonOptionValue) => {
    if (value === "report") {
      setReportOpen(true);
      return;
    }
    setLeaveChatRoomModalOpen(true);
  };

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          className="flex h-10 w-10 items-center justify-end"
          aria-label="채팅방 메뉴 열기 버튼"
          type="button"
          onClick={() => setChatMenuOpen((prev) => !prev)}
        >
          <Icon name="Information" size={18} />
        </button>
        <MenuItem chatMenuOpen={chatMenuOpen} onOptionClick={handleOptionClick} />
      </div>
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        targetId={roomId}
        targetType="CHAT"
      />
      <ConfirmModal
        isOpen={leaveChatRoomModalOpen}
        onClose={() => setLeaveChatRoomModalOpen(false)}
        title="채팅방을 나가시겠어요?"
        content="채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요, 채팅방에서 나가시겠어요?"
        onConfirm={() => leaveChatRoom(undefined)}
        onCancel={() => setLeaveChatRoomModalOpen(false)}
      />
    </>
  );
};

export default ChatRoomHeaderInfoButton;
