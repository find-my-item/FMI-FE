"use client";

import Icon from "../Icon/Icon";

const InputSearch = () => {
  return (
    <div className="flex w-full flex-row gap-2">
      {/* 이미지 첨부버튼 */}
      <button className="h-11 w-11 rounded-full bg-[#F5F5F5]">
        <Icon name="Image" />
      </button>

      <input className="h-11 w-full rounded-[24px] bg-[#F5F5F5] text-[#9D9D9D] focus:text-[#000000] disabled:text-[#9D9D9D]" />
      {/* 전송 버튼 */}
      <button className="h-11 w-11 rounded-full bg-[#1EB87B] opacity-70">
        <Icon name="Send" />
      </button>
    </div>
  );
};

export default InputSearch;
