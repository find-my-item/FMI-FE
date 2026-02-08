import { cn } from "@/utils";
import { InputHTMLAttributes } from "react";

type RadioOption = {
  value: string;
  label: string;
};

interface DeleteAccountRadioItemProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "value" | "checked" | "onChange"
> {
  option: RadioOption;
  selected: string;
  onChange: (value: string) => void;
  inputName: string;
  labelClassName?: string;
}

const DeleteAccountRadioItem = ({
  option,
  selected,
  onChange,
  inputName,
  labelClassName,
  ...inputProps
}: DeleteAccountRadioItemProps) => {
  const { value, label } = option;
  const isChecked = selected === value;

  return (
    <label
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 py-[6px] text-body1-semibold text-neutral-normal-default",
        labelClassName
      )}
    >
      <input
        type="radio"
        name={inputName}
        value={value}
        checked={isChecked}
        onChange={(e) => onChange(e.target.value)}
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

export default DeleteAccountRadioItem;
