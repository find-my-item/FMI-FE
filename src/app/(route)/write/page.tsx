"use client";

import { DetailHeader } from "@/components";
import Icon from "@/components/Icon/Icon";
import RequiredText from "@/components/RequiredText/RequiredText";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import TempSaveModal from "./_components/TempSaveModal/TempSaveModal";
import CategoryPopup from "./_components/CategoryPopup/CategoryPopup";

const styles = {
  section: "border-b border-[#E4E4E4] px-5 py-6",
};

const Page = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="sr-only">분실/습득 등록 페이지</h1>

      <DetailHeader title="분실했어요 글쓰기">
        <DetailHeader.Save onClick={() => setSaveModalOpen(true)} />
      </DetailHeader>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <section
          className={cn("flex flex-col items-start justify-center gap-4", styles.section)}
          aria-label="이미지 업로드"
        >
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} />
          <div
            className="h-[104px] w-[104px] cursor-pointer rounded-[6px] bg-[#F5F5F5] flex-col-center"
            onClick={handleDivClick}
          >
            <Icon name="Camera" size={32} title="이미지 업로드" />
            <span className="text-[12px] leading-[130%] tracking-[-0.02em] text-[#9D9D9D]">
              (0/5)
            </span>
          </div>
          <span className="text-[12px] leading-[130%] tracking-[-0.02em] text-[#9D9D9D]">
            * 사진은 최대 5장 첨부가 가능합니다. (선택)
          </span>
        </section>

        <section
          className={cn("flex cursor-pointer items-center justify-between", styles.section)}
          aria-label="카테고리 선택"
          onClick={() => setCategoryPopupOpen(true)}
        >
          <span className="leading-[150%] text-[#9D9D9D]">
            카테고리를 선택해 주세요. <RequiredText />
          </span>
          <button type="button" className="h-6 w-6">
            <Icon name="ArrowDown" size={24} title="카테고리 선택" />
          </button>
        </section>

        <section
          className={cn("relative flex items-center justify-between", styles.section)}
          aria-label="제목 입력"
        >
          <div className="relative w-full">
            <input
              type="text"
              name="title"
              id="title"
              className="peer w-full bg-transparent leading-[150%] text-[#9D9D9D] placeholder-transparent outline-none"
              placeholder="제목을 입력해 주세요."
              required
            />
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 leading-[150%] text-[#9D9D9D] peer-placeholder-shown:opacity-100 peer-[&:not(:placeholder-shown)]:opacity-0">
              제목을 입력해 주세요.
              <RequiredText />
            </span>
          </div>
        </section>

        <section className={cn(styles.section, "min-h-[248px]")} aria-label="내용 입력">
          <label htmlFor="content" className="leading-[150%] text-[#9D9D9D]">
            내용을 입력해 주세요. <RequiredText />
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="분실/습득 날짜, 물건 종류, 물건의 특징 등 유실물 찾기에 도움이 되는 내용을 작성해 주세요."
            className={cn(
              "w-full resize-none py-6 text-[16px] leading-[150%] text-[#5D5D5D]",
              "placeholder:text-[14px] placeholder:leading-[140%] placeholder:text-[#9D9D9D] focus:outline-none"
            )}
            rows={3}
            required
          />
        </section>

        <section
          className={cn("flex cursor-pointer items-center justify-between", styles.section)}
          aria-label="위치 등록"
        >
          <span className="flex items-center gap-[6px] leading-[150%] text-[#9D9D9D]">
            <Icon name="Location" size={16} title="위치 등록" />
            위치를 등록해 주세요. <RequiredText />
          </span>
          <button type="button" className="h-[18px] w-[18px]">
            <Icon name="ArrowRight" title="위치 열기" size={18} />
          </button>
        </section>

        <section className="border-t border-[#E4E4E4] px-5 pb-8 pt-3" aria-label="작성 완료">
          <button
            type="submit"
            className={cn(
              "glass-card w-full rounded-[12px] py-[10px] text-[16px] font-bold",
              disabled && "opacity-50",
              disabled
                ? "cursor-not-allowed bg-[#98E3BD]/90 text-[#C2F1D4]"
                : "bg-[#1EB87B]/70 text-[#F6FFFC]"
            )}
          >
            작성 완료
          </button>
        </section>
      </form>

      <TempSaveModal isOpen={saveModalOpen} onClose={() => setSaveModalOpen(false)} />
      <CategoryPopup isOpen={categoryPopupOpen} onClose={() => setCategoryPopupOpen(false)} />
    </>
  );
};

export default Page;
