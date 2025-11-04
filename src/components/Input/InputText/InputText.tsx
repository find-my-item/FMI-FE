"use client";
"use no memo";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";
import { cn } from "@/utils/cn";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";
import Label from "../_internal/Label/Label";
import Caption from "../_internal/Caption/Caption";

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
  errorMessage?: string;
  hasError?: boolean;
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
  hasError = false,
  errorMessage,
  validation,
  ...props
}: InputTextProps) => {
  const { register, watch, setValue } = useFormContext();

  const isValue = watch(name) ?? "";
  const isValueStr = (isValue ?? "").toString();

  const [show, setShow] = useState(false);
  const actualType = () => {
    if (eyeShow && (name === "password" || name === "passwordConfirm")) {
      return show ? "text" : "password";
    }
    return type;
  };

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
            type={actualType()}
            className={cn(className, hasError && "border-system-warning border")}
            {...register(name, validation)}
          />

          {/* 삭제 버튼 */}
          <DeleteButton
            eyeShow={eyeShow}
            className="top-1/2 -translate-y-1/2"
            value={isValue}
            onDelete={() => setValue(name, "")}
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
          hasError={hasError}
          successMessage={props.successMessage}
          errorMessage={errorMessage}
          rule={props.rule}
        />

        {/* 글자 수 확인 */}
        {name === "nickname" && <span> {isValueStr.length}/10 </span>}
      </div>
    </div>
  );
};

export default InputText;
