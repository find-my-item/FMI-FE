"use client";

import { useState } from "react";
import { FloatingButton, Icon } from "@/components/common";
import Link from "next/link";
import { cn } from "@/utils";

const PostWriteMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-[30px] right-5">
      <div className="relative flex justify-end">
        {/* 메뉴 */}
        {isOpen && (
          <div className="absolute bottom-[65px] left-1/2 mb-3 -translate-x-[85%]">
            <div className="glass-card w-[213px] overflow-hidden text-nowrap rounded-[20px] border border-white">
              <Link href={"/write/post?type=lost"} className="flex items-center gap-2 px-7 py-4">
                <Icon name="LostWriteBtn" size={20} />
                <span className="text-h3-medium text-neutral-normal-default">
                  분실했어요 글쓰기
                </span>
              </Link>
              <hr className="h-px w-full bg-white" />
              <button className="flex items-center gap-2 px-7 py-4">
                <Icon name="FindWriteBtn" size={20} />
                <span className="text-h3-medium text-neutral-normal-default">
                  습득했어요 글쓰기
                </span>
              </button>
            </div>
          </div>
        )}

        {/* FAB */}
        <FloatingButton
          ariaLabel="글쓰기 메뉴"
          buttonClassName={cn(isOpen && "bg-fill-brand-strong-pressed", "transition-colors")}
          iconClassName={cn(isOpen && "rotate-45", "transition-transform")}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default PostWriteMenu;
