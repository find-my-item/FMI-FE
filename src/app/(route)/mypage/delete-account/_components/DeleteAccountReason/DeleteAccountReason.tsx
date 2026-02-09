"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FooterButton } from "@/components/domain";
import { RadioConfig } from "../../_constants/RadioConfig";
import { cn } from "@/utils";
import { DeleteUserRadioType } from "../../_types/RadioType";

interface DeleteAccountRadioItemProps {
  option: { value: string; label: string };
  selected: string;
  onChange: (value: DeleteUserRadioType) => void;
  inputName: string;
}

const DeleteAccountRadioItem = ({
  option,
  selected,
  onChange,
  inputName,
  ...inputProps
}: DeleteAccountRadioItemProps) => {
  const { value, label } = option;
  const isChecked = selected === value;

  return (
    <label className="flex w-full cursor-pointer items-center gap-2 py-[6px] text-body1-semibold text-neutral-normal-default">
      <input
        type="radio"
        name={inputName}
        value={value}
        checked={isChecked}
        onChange={(e) => onChange(e.target.value as DeleteUserRadioType)}
        className="peer hidden"
        {...inputProps}
      />
      <span
        className={cn(
          "relative h-4 w-4 rounded-full border border-neutral-normal-default peer-checked:border-brand-normal-enteredSelected",
          "before:absolute before:inset-[3px] before:scale-0 before:rounded-full before:transition-transform before:bg-fill-brand-normal-enteredSelected",
          "peer-checked:before:scale-100"
        )}
      />
      <span>{label}</span>
    </label>
  );
};

const DeleteAccountReason = () => {
  const router = useRouter();

  const [isSelected, setIsSelected] = useState<DeleteUserRadioType | "">("");

  const handleNext = () => {
    router.push("?state=passwordConfirm");
  };

  return (
    <>
      <div className="flex w-full flex-col gap-7 px-5 py-[30px] h-base">
        <h3 className="text-h3-semibold">탈퇴하시려는 이유를 알려주세요.</h3>

        <div className="flex flex-col gap-[14px]">
          {RadioConfig.map((item) => (
            <DeleteAccountRadioItem
              key={item.value}
              option={item}
              selected={isSelected}
              onChange={setIsSelected}
              inputName="회원 탈퇴 사유"
            />
          ))}
        </div>
      </div>

      <FooterButton label="다음" onClick={handleNext} type="button" />
    </>
  );
};

export default DeleteAccountReason;
