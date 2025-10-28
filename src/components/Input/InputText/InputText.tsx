"use client";

import { InputHTMLAttributes, useState } from "react";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils/cn";
import DeleteButton from "../DeleteButton";

interface InputTextType extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  className?: string;
  eyeShow?: boolean;
  IsBtn?: boolean;
}

const InputText = ({
  name,
  type = "text",
  className = InputStyle,
  eyeShow = false,
  IsBtn = false,
  ...props
}: InputTextType) => {
  const [value, setValue] = useState(""); // input 상태 관리 값
  const [show, setShow] = useState(false);

  const showClear = !!value;

  const actualType =
    eyeShow && (name === "password" || name === "passwordConfirm")
      ? show
        ? "text"
        : "password"
      : type;

  return (
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
      {/* <button
        className={cn(
          "absolute top-1/2 h-[16.67px] w-[16.67px] -translate-y-1/2 rounded-full bg-[#9D9D9D] outline-none flex-center",
          eyeShow ? "right-8" : "right-2",
          !showClear && "opacity-0"
        )}
        type="button"
        onClick={() => setValue("")}
      >
        <Icon name="Delete" aria-label="입력값 지우기" size={6.97} />
      </button> */}

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

      {/* with Button */}
      <button></button>
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
