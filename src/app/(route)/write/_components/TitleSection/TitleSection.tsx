"use client";

import RequiredText from "@/components/RequiredText/RequiredText";

const TitleSection = () => {
  return (
    <section
      className="relative flex items-center justify-between border-b border-[#E4E4E4] px-5 py-6"
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
  );
};

export default TitleSection;
