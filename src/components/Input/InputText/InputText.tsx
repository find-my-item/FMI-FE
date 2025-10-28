"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils/cn";
import DeleteButton from "../DeleteButton";
import Button from "@/components/Button/Button";

interface InputTextType extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  className?: string;
  eyeShow?: boolean;
  label: string;
  required: boolean;
}

const InputText = ({
  name,
  type = "text",
  className = InputStyle,
  eyeShow = false,
  label,
  required,
  children,
  ...props
}: InputTextType & { children?: ReactNode }) => {
  const [value, setValue] = useState(""); // input 상태 관리 값
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
        {label}
        {required && <span className="text-[#1EB87B]">*</span>}
      </label>

      <div className="flex w-full flex-row gap-2">
        <div className="relative flex w-full flex-row">
          <input
            {...props}
            name={name}
            type={actualType}
            className={className}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          {/* 삭제 버튼 */}
          <DeleteButton
            eyeShow={eyeShow}
            isValue={value}
            customStyle="top-1/2 -translate-y-1/2"
            onDelete={() => setValue("")}
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
          // <Button className="bg-white border border-[#CFCFCF] text-body1-semibold text-[#5D5D5D]">
          <Button variant="outlined" className="text-body1-semibold">
            {children}
          </Button>
        )}
      </div>

      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-[#787878]">
        <p> Cpation </p>
        {name === "nickname" && <span> {value.length}/10 </span>}
      </div>
    </div>
  );

  // return (
  //   <div className="relative flex w-full flex-row">
  //     <input
  //       {...register(name, rest.validation)}
  //       type={actualType}
  //       className={className}
  //       {...rest}
  //     />

  //     {/* 삭제 버튼 */}
  //     <button
  //       className={cn(
  //         "absolute top-1/2 h-[16.67px] w-[16.67px] -translate-y-1/2 rounded-full bg-[#9D9D9D] outline-none flex-center",
  //         eyeShow ? "right-8" : "right-2",
  //         !showClear && "opacity-0"
  //       )}
  //       type="button"
  //       onClick={() =>
  //         setValue(name, "", { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  //       }
  //     >
  //       <Icon name="Delete" aria-label="입력값 지우기" size={6.97} />
  //     </button>

  //     {/* 비밀번호 눈 모양 버튼 */}
  //     {eyeShow && (
  //       <button
  //         className="absolute right-2 top-3 outline-none flex-center"
  //         type="button"
  //         aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
  //         onClick={() => setShow(!show)}
  //       >
  //         <Icon name={show ? "EyeOpen" : "EyeOff"} size={16} />
  //       </button>
  //     )}
  //   </div>
  // );
};

export default InputText;
