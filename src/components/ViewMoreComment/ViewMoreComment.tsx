import { ButtonHTMLAttributes } from "react";

interface ViewMoreComment extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  ariaLabel?: string;
}

const ViewMoreComment = ({ text, ariaLabel = "댓글 더보기", ...props }: ViewMoreComment) => {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className="min-h-[41px] w-[250px] text-[18px] font-[140] text-[#1EB87B] flex-center hover:text-[#00B76E] active:text-[#6ED5A7] disabled:text-[#98E3BD]"
    >
      <span>{text}</span>
    </button>
  );
};

export default ViewMoreComment;
