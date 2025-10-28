import { Icon } from "@/components";
import { useRef } from "react";

const ImageSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      className="flex flex-col items-start justify-center gap-4 border-b border-[#E4E4E4] px-5 py-6"
      aria-label="이미지 업로드"
    >
      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} />
      <div
        className="h-[104px] w-[104px] cursor-pointer rounded-[6px] bg-[#F5F5F5] flex-col-center"
        onClick={handleDivClick}
      >
        <Icon name="Camera" size={32} title="이미지 업로드" />
        <span className="text-[12px] leading-[130%] tracking-[-0.02em] text-[#9D9D9D]">(0/5)</span>
      </div>
      <span className="text-[12px] leading-[130%] tracking-[-0.02em] text-[#9D9D9D]">
        * 사진은 최대 5장 첨부가 가능합니다. (선택)
      </span>
    </section>
  );
};

export default ImageSection;
