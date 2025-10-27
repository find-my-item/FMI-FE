"use client";

import { Icon } from "@/components";
import { useState } from "react";
import RequiredText from "@/components/RequiredText/RequiredText";
import CategoryPopup from "../CategoryPopup/CategoryPopup";

const CategorySection = () => {
  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);

  return (
    <>
      <section
        className="flex cursor-pointer items-center justify-between border-b border-[#E4E4E4] px-5 py-6"
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
      <CategoryPopup isOpen={categoryPopupOpen} onClose={() => setCategoryPopupOpen(false)} />
    </>
  );
};

export default CategorySection;
