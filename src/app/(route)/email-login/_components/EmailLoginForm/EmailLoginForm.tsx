"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CheckBox, InputText, Button } from "@/components";
import { EMAIL_LOGIN_CONFIG } from "../../_constants/EMAIL_LOGIN_CONFIG";
import { LoginType } from "../../_types/LoginType";
import useLoginForm from "../../_hooks/useLoginForm";

const Page = () => {
  const { register, control } = useFormContext<LoginType>();
  const checkBoxValues = useWatch({ control, name: "rememberId" });

  const { onSubmitLogin } = useLoginForm();

  return (
    <form onSubmit={onSubmitLogin} className="flex w-full flex-col gap-12">
      {/* 로그인 입력칸 */}
      <fieldset className="flex w-full flex-col gap-3">
        {EMAIL_LOGIN_CONFIG.map((item) => (
          <InputText key={item.name} {...item} />
        ))}
        {/* 체크박스 */}
        <CheckBox
          {...register("rememberId", { required: false })}
          id="rememberId"
          label="아이디 기억하기"
          boxSize="w-[18px] h-[18px]"
          textStyle="text-caption1-semibold text-neutral-normal-default ml-2"
          iconSize="h-[6px]"
          state={!!checkBoxValues}
        />
      </fieldset>

      {/* 로그인 버튼 */}
      <footer className="w-full gap-6 flex-col-center">
        <Button type="submit" variant="auth">
          로그인
        </Button>
        {/* divider 구분선 */}
        <nav className="flex h-4 w-full items-center">
          <hr className="h-px flex-1 border border-divider-default" aria-hidden={true} />
          <span className="px-3 text-caption1-medium text-layout-body-default">
            로그인이 되지 않는다면?
          </span>
          <hr className="h-px flex-1 border border-divider-default" aria-hidden={true} />
        </nav>
      </footer>
    </form>
  );
};

export default Page;
