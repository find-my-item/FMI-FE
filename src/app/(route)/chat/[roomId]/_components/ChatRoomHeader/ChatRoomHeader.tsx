"use client";

import { Icon, ConfirmModal } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MOCK_IMAGES } from "../../../_components/ChatItem/MOCK_IMAGES";
import ChatChip from "../ChatChip/ChatChip";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

const HeaderInfo = () => {
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

  const INFO_OPTIONS = [
    {
      label: "차단, 신고하기",
      value: "report" as const,
    },
    {
      label: "채팅방 나가기",
      value: "leave" as const,
    },
  ];

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
          className="flex h-[40px] w-[40px] items-center justify-end"
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
                    "glass-card w-full text-nowrap border border-white bg-white/50 px-[28px] py-[16px] text-left text-h3-medium transition-colors hover:bg-white/70",
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

const ChatRoomHeader = ({ postMode }: { postMode: "lost" | "find" }) => {
  const router = useRouter();

  return (
    <header className="pb-[12px]">
      <nav className="flex items-center justify-between px-[16px] py-[4px]">
        <button
          className="flex h-[40px] w-[40px] items-center"
          aria-label="뒤로 가기 버튼"
          onClick={() => router.back()}
          type="button"
        >
          <Icon name="ArrowLeftSmall" size={18} />
        </button>

        <p className="text-body2-semibold text-layout-body-default">사용자 닉네임</p>

        <HeaderInfo />
      </nav>

      <section className="flex items-center gap-[16px] px-[16px]">
        <Image
          alt="게시글 썸네일 이미지"
          src={MOCK_IMAGES[0]}
          width={40}
          height={40}
          className="h-[40px] w-[40px] rounded"
        />

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1">
            <ChatChip postMode={postMode} />
            <h2 className="truncate text-body1-semibold text-layout-header-default">
              여기에 게시글명이 표기됩니다 여기에 게시글명이 표기됩니다. 여기에
            </h2>
          </div>
          <p className="h-[16px] text-caption1-medium text-layout-body-default">
            서울시 중구 회현동
          </p>
        </div>
      </section>
    </header>
  );
};

export default ChatRoomHeader;
