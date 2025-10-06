import Icon from "@/components/Icon/Icon";
import React from "react";

const SimilarItemsSection = () => {
  return (
    <section className="flex flex-col gap-[16px] px-5 py-[18px]">
      <h2 className="text-[20px] font-semibold">비슷한 분실물</h2>

      <div className="flex flex-col items-start justify-center gap-3">
        <div className="h-[126px] w-[126px] rounded-[6px] bg-[#D9D9D9]" />
        <div className="flex flex-col gap-[3px]">
          <span className="font-semibold">게시글 제목</span>
          <span className="text-[14px] leading-5 text-[#5D5D5D]">노원구 · 30분 전</span>
        </div>
        <ul className="flex items-center gap-2">
          <li className="flex items-center gap-1">
            <Icon name="Eye" size={18} aria-hidden="true" />
            <span className="text-[14px] leading-5 text-[#9D9D9D]">24</span>
          </li>
          <li className="flex items-center gap-1">
            <Icon name="Star" size={18} aria-hidden="true" />
            <span className="text-[14px] leading-5 text-[#9D9D9D]">12</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SimilarItemsSection;
