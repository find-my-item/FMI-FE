"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { InquiryTargetType } from "@/types";
import { INQUIRY_WRITE_CATEGORY_OPTIONS } from "@/constants";
import { RequiredText } from "@/components/common";
import { CategoryPopup } from "@/components/domain";
import { cn } from "@/utils";

interface InquiryWriteFormValues {
  category?: InquiryTargetType;
}

const getInquiryCategoryLabel = (category: InquiryTargetType) =>
  INQUIRY_WRITE_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? "";

const InquiryCategoryButton = () => {
  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const { control, setValue } = useFormContext<InquiryWriteFormValues>();
  const category = useWatch({ control, name: "category" });

  const handleSelectCategory = (selectedCategory: InquiryTargetType) => {
    setValue("category", selectedCategory, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setCategoryPopupOpen(false);
  };

  const categoryLabel = category ? getInquiryCategoryLabel(category) : "";

  return (
    <div className="px-5 py-2">
      <button
        className={cn(
          "w-full rounded-full px-4 py-3 text-start text-body1-regular bg-fill-neutral-subtle-default focus:border focus:border-brand-normal-default focus:outline-none disabled:bg-fill-neutral-subtle-pressed",
          category ? "text-layout-header-default" : "text-layout-body-default"
        )}
        type="button"
        onClick={() => setCategoryPopupOpen(true)}
      >
        {categoryLabel || "카테고리를 선택해주세요."}
        {!category && <RequiredText />}
      </button>

      <CategoryPopup
        isOpen={categoryPopupOpen}
        onClose={() => setCategoryPopupOpen(false)}
        onSelect={(category) => handleSelectCategory(category as InquiryTargetType)}
        mode="inquiry"
      />
    </div>
  );
};

export default InquiryCategoryButton;
