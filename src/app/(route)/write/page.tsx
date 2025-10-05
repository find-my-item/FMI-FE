"use client";

import Icon from "@/components/Icon/Icon";
import RequiredText from "@/components/RequiredText/RequiredText";
import { cn } from "@/utils/cn";
import { useRef } from "react";

const styles = {
  section: "border-b border-[#E4E4E4] px-5 py-6",
};

const Page = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <h1 className="sr-only">분실/습득 등록 페이지</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <section
          className={cn("flex flex-col items-start justify-center gap-4", styles.section)}
          aria-label="이미지 업로드"
        >
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} />
          <div
            className="flex-center h-[104px] w-[104px] cursor-pointer rounded-[6px] bg-[#F5F5F5]"
            onClick={handleDivClick}
          >
            <Icon name="Camera" size={32} title="이미지 업로드" />
          </div>
          <span className="text-[14px] text-[#9D9D9D]">
            * jpg, jpeg, png 파일을 첨부해 주세요. (선택)
          </span>
        </section>

        <section
          className={cn("flex cursor-pointer items-center justify-between", styles.section)}
          aria-label="카테고리 선택"
        >
          <span className="text-[16px] text-[#9D9D9D]">
            카테고리를 선택해 주세요. <RequiredText />
          </span>
          <button type="button" className="h-4 w-4">
            <Icon name="ArrowDown" size={16} title="카테고리 선택" />
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
              className="peer w-full bg-transparent text-[16px] placeholder-transparent outline-none"
              placeholder="제목을 입력해 주세요."
              required
            />
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#9D9D9D] peer-placeholder-shown:opacity-100 peer-[&:not(:placeholder-shown)]:opacity-0">
              제목을 입력해 주세요.
              <RequiredText />
            </span>
          </div>
        </section>

        <section className={styles.section} aria-label="내용 입력">
          <label htmlFor="content" className="text-[16px] text-[#9D9D9D]">
            내용을 입력해 주세요. <RequiredText />
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="분실/습득 날짜, 물건 종류, 물건의 특징 등 유실물 찾기에 도움이 되는 내용을 작성해 주세요."
            className="w-full resize-none py-6 placeholder:text-[14px] focus:outline-none"
            rows={3}
            required
          />
        </section>

        <section
          className={cn("flex cursor-pointer items-center justify-between", styles.section)}
          aria-label="위치 등록"
        >
          <span className="flex items-center gap-[6px] text-[16px] text-[#9D9D9D]">
            <Icon name="Location" size={16} title="위치 등록" />
            위치를 등록해 주세요. <RequiredText />
          </span>
          <button type="button" className="h-4 w-4">
            <Icon name="ArrowRight" title="위치 열기" size={16} />
          </button>
        </section>

        <section
          className="mt-[159px] border-t border-[#E4E4E4] px-5 pb-10 pt-3"
          aria-label="작성 완료"
        >
          <button
            type="submit"
            className="w-full rounded-[12px] bg-[#F5F5F5] px-[94px] py-5 text-[18px] font-bold text-[#D9D9D9]"
          >
            작성 완료
          </button>
        </section>
      </form>
    </>
  );
};

export default Page;
