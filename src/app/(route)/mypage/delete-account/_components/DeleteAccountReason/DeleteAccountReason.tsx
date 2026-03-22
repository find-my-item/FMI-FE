"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FooterButton } from "@/components/domain";
import { CheckBoxConfig } from "../../_constants/CheckBoxConfig";
import { CheckBox, InputField } from "@/components/common";
import { useToast } from "@/context/ToastContext";

const DeleteAccountReason = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }

      if (prev.length >= 3) {
        return [...prev.slice(1), value];
      }

      return [...prev, value];
    });
  };

  const handleNext = () => {
    if (selectedValues.length === 0) {
      addToast("이유를 하나 이상 선택해주세요.", "warning");
      return;
    }
    router.push("?state=passwordConfirm");
  };

  return (
    <>
      <div className="flex w-full flex-col gap-7 px-5 py-[30px] h-base">
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-h3-semibold">탈퇴하시려는 이유를 알려주세요.</h3>
          <p className="text-body2-regular text-layout-body-default">최대 3개 선택</p>
        </div>
        <div className="flex flex-col gap-[14px]">
          {CheckBoxConfig.map((item) => {
            const isChecked = selectedValues.includes(item.value);
            return (
              <>
                <CheckBox
                  key={item.value}
                  id={item.value}
                  label={item.label}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(item.value)}
                />
                {isChecked && item.value === "OTHER" && <InputField name={""} label={""} />}
              </>
            );
          })}
        </div>
      </div>

      <FooterButton onClick={handleNext}>다음</FooterButton>
    </>
  );
};

export default DeleteAccountReason;
