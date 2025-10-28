"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import CheckBox from "@/components/CheckBox/CheckBox";
import { useWatch, useFormContext } from "react-hook-form";
import Input from "@/components/Input/InputText/InputText";
import Logo from "../_components/Logo";

const CheckBoxItem = [
  { label: "아이디 기억하기", id: "rememberID" },
  { label: "자동 로그인", id: "autoLogin" },
];

const Page = () => {
  const { register, control, handleSubmit } = useFormContext();

  const checkBoxValues = useWatch({ control, name: CheckBoxItem.map((item) => item.id) });

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <div className="flex min-h-screen w-full gap-6 px-5 flex-col-center">
      <Logo />

      <form onSubmit={onSubmit} className="flex w-full flex-col gap-10">
        {/* 로그인 입력칸 */}
        <div className="flex w-full flex-col gap-3">
          {/* <Input name="email" type="text" placeholder="이메일을 입력해주세요." />

          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            eyeShow={true}
          /> */}

          {/* 체크박스 */}
          <div className="flex w-full gap-3 text-[14px] text-[#9D9D9D]">
            {CheckBoxItem.map((item, index) => (
              <CheckBox
                label={item.label}
                id={item.id}
                boxSize="w-[18px] h-[18px]"
                textStyle="text-[12px] ml-2"
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
            <hr className="h-px flex-1 bg-[#E4E4E4]" />
            <span className="px-3 text-[12px] text-[#9D9D9D]">로그인이 되지 않는다면?</span>
            <hr className="h-px flex-1 bg-[#E4E4E4]" />
          </div>
        </div>
      </form>

      {/* 회원확인 여부 */}
      <div className="flex h-11 w-full justify-center">
        <Link href="/find-pw" className="p-3 text-[14px] text-[#9D9D9D]">
          비밀번호 찾기
        </Link>
        <span className="h-4 self-center border-l border-gray-300" />
        <Link href="/sign-up" className="p-3 text-[14px] text-[#1EB87B]">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Page;
