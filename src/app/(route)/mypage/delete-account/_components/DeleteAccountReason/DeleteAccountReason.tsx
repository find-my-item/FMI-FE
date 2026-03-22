"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FooterButton } from "@/components/domain";
import { CheckBoxConfig } from "../../_constants/CheckBoxConfig";
import { cn } from "@/utils";
import { DeleteUserRadioType } from "../../_types/RadioType";
import { CheckBox } from "@/components/common";
import { useToast } from "@/context/ToastContext";

// interface DeleteAccountRadioItemProps {
//   option: { value: string; label: string };
//   selected: string;
//   onChange: (value: DeleteUserRadioType) => void;
//   inputName: string;
// }

// const DeleteAccountRadioItem = ({
//   option,
//   selected,
//   onChange,
//   inputName,
//   ...inputProps
// }: DeleteAccountRadioItemProps) => {
//   const { value, label } = option;
//   const isChecked = selected === value;

//   return (
//     <label className="flex w-full cursor-pointer items-center gap-2 py-[6px] text-body1-semibold text-neutral-normal-default">
//       <input
//         type="radio"
//         name={inputName}
//         value={value}
//         checked={isChecked}
//         onChange={(e) => onChange(e.target.value as DeleteUserRadioType)}
//         className="peer hidden"
//         {...inputProps}
//       />
//       <span
//         className={cn(
//           "relative h-4 w-4 rounded-full border border-neutral-normal-default peer-checked:border-brand-normal-enteredSelected",
//           "before:absolute before:inset-[3px] before:scale-0 before:rounded-full before:transition-transform before:bg-fill-brand-normal-enteredSelected",
//           "peer-checked:before:scale-100"
//         )}
//       />
//       <span>{label}</span>
//     </label>
//   );
// };

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
              <CheckBox
                key={item.value}
                id={item.value}
                label={item.label}
                checked={isChecked}
                onChange={() => handleCheckboxChange(item.value)}
              />
            );
          })}
        </div>
      </div>

      <FooterButton onClick={handleNext}>다음</FooterButton>
    </>
  );
};

export default DeleteAccountReason;
