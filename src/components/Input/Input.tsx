"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputType } from "@/types/InputTypes";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";
import Icon from "../Icon/Icon";
import { cn } from "@/utils/cn/cn";

const Input = ({ name, type, className = InputStyle, eyeShow = false, ...rest }: InputType) => {
  const { register, watch, setValue } = useFormContext();

  const value = watch(name);
  const showClear = !!value;

  const [show, setShow] = useState(false);

  const actualType =
    eyeShow && (name === "password" || name === "passwordConfirm")
      ? show
        ? "text"
        : "password"
      : type;

  return (
    <div className="relative flex w-full flex-row">
      <input
        {...register(name, rest.validation)}
        type={actualType}
        className={className}
        {...rest}
      />

      {/* 삭제 버튼 */}
      <button
        className={cn(
          "absolute top-1/2 h-[16.67px] w-[16.67px] -translate-y-1/2 rounded-full bg-[#9D9D9D] outline-none flex-center",
          eyeShow ? "right-8" : "right-2",
          !showClear && "opacity-0"
        )}
        type="button"
        onClick={() =>
          setValue(name, "", { shouldValidate: true, shouldDirty: true, shouldTouch: true })
        }
      >
        <Icon name="Delete" aria-label="입력값 지우기" size={6.97} />
      </button>

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
  );
};

export default Input;
