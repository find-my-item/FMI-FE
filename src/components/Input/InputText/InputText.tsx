"use client";
import { InputHTMLAttributes, ReactNode, useState } from "react";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils/cn";
import DeleteButton from "../DeleteButton";
import Button from "@/components/Button/Button";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

interface InputTextProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "name" | "onChange" | "onBlur" | "ref" | "children"
  > {
  name: string;
  type: string;
  className?: string;
  eyeShow?: boolean;
  label?: string;
  required?: boolean;
  children?: ReactNode;
  btnOnClick?: () => void;
  errorMessage?: string;
  hasError?: boolean;
  registeration?: UseFormRegisterReturn;
}

const InputText = ({
  name,
  type = "text",
  className = InputStyle,
  eyeShow = false,
  children,
  btnOnClick,
  errorMessage,
  hasError,
  registeration,
  ...props
}: InputTextProps) => {
  const fieldName = registeration?.name ?? name; // Rhf으로 name 통일
  const { watch, setValue } = useFormContext();
  const currentValue = watch(fieldName);

  // 눈 아이콘을 위한 코드
  const [show, setShow] = useState(false);
  const actualType =
    eyeShow && (name === "password" || name === "passwordConfirm")
      ? show
        ? "text"
        : "password"
      : type;

  // 확인용
  console.log("rhf>>>", registeration);

  return (
    <div className="flex w-full flex-col gap-2">
      {/* label */}
      <label htmlFor={name} className="text-body2-medium text-[#363636]">
        {props.label}
        {props.required && <span className="text-[#1EB87B]">*</span>}
      </label>

      <div className="flex w-full flex-row gap-2">
        <div className="relative flex w-full flex-row">
          <input
            {...props}
            type={actualType}
            className={cn(className, hasError && "border border-[#FF4242]")}
            {...registeration}
          />

          {/* 삭제 버튼 */}
          <DeleteButton
            eyeShow={eyeShow}
            customStyle="top-1/2 -translate-y-1/2"
            isValue={currentValue}
            onDelete={() =>
              setValue(name, "", { shouldValidate: true, shouldDirty: true, shouldTouch: true })
            }
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
            className="text-body1-semibold"
            type="button"
            // 버튼 사이즈 확인 필요
            onClick={btnOnClick}
          >
            {children}
          </Button>
        )}
      </div>
      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-[#787878]">
        {hasError && <p className="text-[#FF4242]"> {errorMessage} </p>}
        {/* 성공 색 #00B76E */}
        {name === "nickname" && <span> {currentValue}/10 </span>}
      </div>
    </div>
  );
};

export default InputText;
