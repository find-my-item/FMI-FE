import Icon from "@/components/Icon/Icon";
import { ButtonHTMLAttributes } from "react";

interface ViewMoreReply extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  ariaLabel?: string;
}

// svgr 수정 시, 아이콘 색 수정
const ViewMoreReply = ({ text, ariaLabel = "답글 더보기", ...props }: ViewMoreReply) => {
  return (
    <button
      {...props}
      className="group flex min-h-[40px] w-[390px] items-center gap-[12px] px-[20px]"
      aria-label={ariaLabel}
    >
      <div className="flex gap-[4px] font-[150] text-[#1EB87B] group-active:text-[#6ED5A7] group-disabled:text-[#98E3BD]">
        <span>{text}</span>
        <Icon name="ArrowDown" />
      </div>
      <span className="text-[#5D5D5D] group-hover:text-black group-active:text-[#9D9D9D] group-disabled:text-[#9D9D9D]">
        답글 쓰기
      </span>
    </button>
  );
};

export default ViewMoreReply;
