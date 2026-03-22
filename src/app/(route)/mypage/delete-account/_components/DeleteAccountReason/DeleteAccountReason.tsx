"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { FooterButton } from "@/components/domain";
import { CheckBoxConfig } from "../../_constants/CheckBoxConfig";
import { CheckBox, InputField } from "@/components/common";

const DeleteAccountReason = () => {
  const router = useRouter();
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
              <Fragment key={item.label}>
                <CheckBox
                  key={item.value}
                  id={item.value}
                  label={item.label}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(item.value)}
                />
                {isChecked && item.value === "OTHER" && (
                  <InputField
                    name="otherReason"
                    validation={{ maxLength: 300 }}
                    placeholder="서비스를 탈퇴하려는 이유를 작성해 주세요."
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      <FooterButton
        onClick={() => router.push("?state=passwordConfirm")}
        disabled={selectedValues.length === 0}
      >
        다음
      </FooterButton>
    </>
  );
};

export default DeleteAccountReason;
