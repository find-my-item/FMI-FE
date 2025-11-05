"use client";
"use no memo";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/utils";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Buttons/Button/Button";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";
import Label from "../_internal/Label/Label";
import Caption from "../_internal/Caption/Caption";
import Counter from "../_internal/Counter/Counter";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";

interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "value" | "defaultValue"> {
  name: string;
  type?: string;
  className?: string;
  eyeShow?: boolean;
  label?: string;
  children?: ReactNode;
  btnOnClick?: () => void;
  successMessage?: string;
  isSuccess?: boolean;
  validation?: RegisterOptions;
  rule?: string;
}

const InputText = ({
  name,
  type = "text",
  className = InputStyle,
  eyeShow = false,
  children,
  btnOnClick,
  validation,
  ...props
}: InputTextProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isValue = watch(name) ?? "";
  const isValueStr = (isValue ?? "").toString();

  const [show, setShow] = useState(false);
  const actualType = () => {
    if (eyeShow && (name === "password" || name === "passwordConfirm")) {
      return show ? "text" : "password";
    }
    return type;
  };

  const maxLengthValue =
    typeof validation?.maxLength === "number" ? validation.maxLength : validation?.maxLength?.value;

  return (
    <div className="flex w-full flex-col gap-2">
      {/* label */}
      <Label
        name={name}
        label={props.label}
        required={!!validation?.required}
        className="text-body2-medium text-layout-header-default"
      />

      <div className="flex w-full flex-row gap-2">
        <div className="relative flex w-full flex-row">
          <input
            {...props}
            {...register(name, validation)}
            type={actualType()}
            className={cn(className, !!errors[name] && "border border-system-warning")}
          />

          {/* 삭제 버튼 */}
          <DeleteButton
            eyeShow={eyeShow}
            className="top-1/2 -translate-y-1/2"
            value={isValue}
            onDelete={() => setValue(name, "", { shouldValidate: true })}
          />

          {/* 비밀번호 눈 모양 버튼 */}
          {eyeShow && (
            <button
              className="absolute right-2 top-3 outline-none flex-center"
              type="button"
              aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShow(!show)}
            >
              <Icon name={show ? "EyeOpen" : "EyeOff"} size={16} />
            </button>
          )}
        </div>

        {/* with Button */}
        {children && (
          <Button
            variant="outlined"
            type="button"
            onClick={btnOnClick}
            ignoreBase
            className="w-auto whitespace-nowrap rounded-[10px] px-[14px] py-[10px] text-body2-semibold"
          >
            {children}
          </Button>
        )}
      </div>

      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-layout-body-default">
        <Caption
          isSuccess={props.isSuccess}
          successMessage={props.successMessage}
          hasError={!!errors[name]}
          errorMessage={errors[name]?.message as string}
          rule={props.rule}
        />

        {/* 글자 수 확인 */}
        <Counter isLength={isValueStr.length} maxLength={maxLengthValue} />
      </div>
    </div>
  );
};

export default InputText;
