"use client";

import Link from "next/link";
import { useWatch, useFormContext } from "react-hook-form";
import { CheckBox, InputText, Button } from "@/components";
import { Logo } from "../../_components";
import { CHECKBOX_CONFIG } from "./_constant/CHECKBOX_CONFIG";
import { EMAIL_LOGIN_CONFIG } from "./_constant/EMAIL_LOGIN_CONFIG";

const Page = () => {
  const { register, control, handleSubmit } = useFormContext();

  const checkBoxValues = useWatch({ control, name: CHECKBOX_CONFIG.map((item) => item.id) });

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <div className="flex min-h-screen w-full gap-6 px-5 flex-col-center">
      <Logo />

      <form onSubmit={onSubmit} className="flex w-full flex-col gap-10">
        {/* 로그인 입력칸 */}
        <div className="flex w-full flex-col gap-3">
          {EMAIL_LOGIN_CONFIG.map((item) => (
            <InputText
              name={item.name}
              label={item.label}
              validation={item.validation}
              type={item.type}
              placeholder={item.placeholder}
              eyeShow={item.eyeShow}
            />
          ))}
          {/* 체크박스 */}
          <div className="flex w-full gap-3">
            {CHECKBOX_CONFIG.map((item, index) => (
              <CheckBox
                label={item.label}
                id={item.id}
                boxSize="w-[18px] h-[18px]"
                textStyle="text-caption1-semibold text-neutral-normal-default ml-2"
                iconSize="h-[6px]"
                {...register(item.id)}
                state={!!checkBoxValues?.[index]}
              />
            ))}
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div className="w-full gap-6 flex-col-center">
          <Button type="submit" ariaLabel="로그인 버튼" variant="auth">
            로그인
          </Button>
          {/* divider 구분선 */}
          <div className="flex h-4 w-full items-center">
            <hr className="h-px flex-1 bg-flatGray-100" />
            <span className="px-3 text-caption1-medium text-layout-body-default">
              로그인이 되지 않는다면?
            </span>
            <hr className="h-px flex-1 bg-flatGray-100" />
          </div>
        </div>
      </form>

      {/* 회원확인 여부 */}
      <div className="flex h-11 w-full justify-center text-caption1-semibold text-neutralInversed-strong-default">
        <Link href="/find-pw" className="p-3">
          비밀번호 찾기
        </Link>
        <hr className="h-4 self-center border-l border-gray-300" />
        <Link href="/sign-up" className="p-3">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Page;
