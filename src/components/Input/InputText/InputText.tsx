"use client";
import { InputHTMLAttributes, ReactNode, useState } from "react";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils/cn";
import DeleteButton from "../DeleteButton";
import Button from "@/components/Button/Button";
import { RegisterOptions, useFormContext, UseFormRegisterReturn, useWatch } from "react-hook-form";

interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "value" | "defaultValue"> {
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
  validation?: RegisterOptions;
  // registeration?: UseFormRegisterReturn;
  // watchedValue?: string;
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
  // registeration,
  ...props
}: InputTextProps) => {
  const { register, watch } = useFormContext();
  const currentValue = watch(name);
  console.log(name, ">>> ", currentValue);
  // 삭제 함수를 위한 코드
  // const [value, setValue] = useState("");

  // 눈 아이콘을 위한 코드
  const [show, setShow] = useState(false);
  const actualType =
    eyeShow && (name === "password" || name === "passwordConfirm")
      ? show
        ? "text"
        : "password"
      : type;

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
            {...register(name, props.validation)}
          />
          {/* 삭제 버튼 */}
          {/* <DeleteButton
            eyeShow={eyeShow}
            customStyle="top-1/2 -translate-y-1/2"
            isValue={!!value}
            onDelete={() => setValue("")}
          /> */}

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
            className="text-body1-semibold text-[#5D5D5D]"
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
        {/* {name === "nickname" && <span> {value.length}/10 </span>} */}
      </div>
    </div>
  );
};

export default InputText;
