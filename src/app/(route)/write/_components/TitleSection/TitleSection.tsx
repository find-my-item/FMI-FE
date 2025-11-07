"use client";

import { RequiredText } from "@/components";

const TitleSection = () => {
  return (
    <section
      className="relative flex items-center justify-between border-b border-flatGray-50 px-5 py-6"
      aria-label="제목 입력"
    >
      <div className="relative w-full">
        <input
          type="text"
          name="title"
          id="title"
          className="peer w-full bg-transparent text-body1-medium text-neutral-normal-default placeholder-transparent outline-none placeholder:text-flatGray-400"
          placeholder="제목을 입력해 주세요."
          required
        />
        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-body1-medium text-neutral-normal-placeholder peer-placeholder-shown:opacity-100 peer-[&:not(:placeholder-shown)]:opacity-0">
          제목을 입력해 주세요.
          <RequiredText />
        </span>
      </div>
    </section>
  );
};

export default TitleSection;
