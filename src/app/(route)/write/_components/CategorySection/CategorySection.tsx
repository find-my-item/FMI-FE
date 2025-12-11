"use client";

import { useState } from "react";
import { CategoryPopup } from "../_internal";
import { Icon, RequiredText } from "@/components";

const CategorySection = () => {
  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);

  return (
    <>
      <section
        onClick={() => setCategoryPopupOpen(true)}
        className="flex cursor-pointer items-center justify-between border-b border-flatGray-50 px-5 py-6"
      >
        <span className="text-body1-medium text-neutral-normal-placeholder">
          카테고리를 선택해 주세요. <RequiredText />
        </span>
        <button type="button" aria-label="카테고리 선택" className="size-6">
          <Icon name="ArrowDown" size={24} />
        </button>
      </section>

      <CategoryPopup isOpen={categoryPopupOpen} onClose={() => setCategoryPopupOpen(false)} />
    </>
  );
};

export default CategorySection;
