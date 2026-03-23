"use client";
"use no memo";

import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FooterButton } from "@/components/domain";
import { CheckBoxConfig } from "../../_constants/CheckBoxConfig";
import { CheckBox, InputField } from "@/components/common";
import { useFormContext } from "react-hook-form";

const DeleteAccountReason = ({ onNext }: { onNext: () => void }) => {
  const router = useRouter();

  const { setValue, watch, register } = useFormContext();
  const selectedValues: string[] = watch("reasons") || [];

  // useEffect(() => {
  //   const savedReasons = sessionStorage.getItem("reasons");
  //   const savedOther = sessionStorage.getItem("other_reason");

  //   if (savedReasons) {
  //     setValue("reasons", JSON.parse(savedReasons));
  //   }
  //   if (savedOther) {
  //     setValue("otherReason", savedOther);
  //   }
  // }, [setValue]);

  // useEffect(() => {
  //   sessionStorage.setItem("reasons", JSON.stringify(selectedValues));
  // }, [selectedValues]);

  // const otherReasonValue = watch("otherReason");
  // useEffect(() => {
  //   if (otherReasonValue) {
  //     sessionStorage.setItem("other_reason", otherReasonValue);
  //   }
  // }, [otherReasonValue]);

  const handleCheckboxChange = (value: string) => {
    let nextValues: string[];

    if (selectedValues.includes(value)) {
      nextValues = selectedValues.filter((item) => item !== value);
    } else {
      nextValues =
        selectedValues.length >= 3
          ? [...selectedValues.slice(1), value]
          : [...selectedValues, value];
    }

    setValue("reasons", nextValues, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-7 px-5 py-[30px] h-base">
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-h3-semibold">탈퇴하시려는 이유를 알려주세요.</h3>
          <p className="text-body2-regular text-layout-body-default">최대 3개 선택</p>
        </div>
        <div className="flex flex-col gap-[18px]">
          {CheckBoxConfig.map((item) => {
            const isChecked = selectedValues.includes(item.value);
            return (
              <Fragment key={item.label}>
                <CheckBox
                  {...register("reasons")}
                  id={item.value}
                  label={item.label}
                  value={item.value}
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

      <FooterButton onClick={() => onNext()} disabled={selectedValues.length === 0}>
        다음
      </FooterButton>
    </>
  );
};

export default DeleteAccountReason;
