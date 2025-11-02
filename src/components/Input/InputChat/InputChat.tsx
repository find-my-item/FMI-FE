"use client";

import { InputHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface InputChatProps extends InputHTMLAttributes<HTMLInputElement> {
  photoClick: () => void;
  sendClick?: () => void;
}

const InputChat = ({ photoClick, sendClick, ...props }: InputChatProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full flex-row gap-2">
      {/* 이미지 첨부버튼 */}
      <button
        className="relative h-11 w-11 shrink-0 rounded-full bg-[#F5F5F5]"
        onClick={photoClick}
      >
        <Icon
          name="Image"
          size={20}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </button>

      <input
        {...props}
        className={cn(
          "h-11 min-w-0 flex-1 rounded-[24px] bg-[#F5F5F5] px-4 text-[14px] text-[#9D9D9D] hover:placeholder-black focus:text-black disabled:text-[#9D9D9D]",
          value && "text-black"
        )}
        placeholder="메시지 보내기"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* 전송 버튼 */}
      <button
        className="relative h-11 w-11 shrink-0 rounded-full bg-[#98E3BD] opacity-90 hover:bg-[#1EB87B] hover:opacity-70"
        onClick={sendClick}
      >
        <Icon
          name="Send"
          size={20}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </button>
    </div>
  );
};

export default InputChat;
