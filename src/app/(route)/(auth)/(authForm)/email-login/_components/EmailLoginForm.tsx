"use no memo";

import { useEffect } from "react";
import { CheckBox, InputText, Button } from "@/components";
import { EMAIL_LOGIN_CONFIG } from "../_constants/EMAIL_LOGIN_CONFIG";
import { CHECKBOX_CONFIG } from "../_constants/CHECKBOX_CONFIG";
import { useToast } from "@/context/ToastContext";
import { useWatch, useFormContext } from "react-hook-form";
import { useApiLogin } from "../_hooks/useApiLogin";
import { useRouter } from "next/navigation";

const EmailLoginForm = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useFormContext();

  const { mutate, isPending } = useApiLogin();

  const checkBoxValues = useWatch({ control, name: CHECKBOX_CONFIG.map((item) => item.id) });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("saved-email");
      if (savedEmail) {
        setValue("email", savedEmail);
        setValue("rememberId", true);
      }
    }
  }, [setValue]);

  const onSubmit = handleSubmit((data) => {
    console.log("data>> ", data);

    alert("폼 제출되었습니다.");
    const isEmail = getValues("email");
    const isPassword = getValues("password");

    mutate(
      { email: isEmail, password: isPassword },
      {
        onSuccess: (data) => {
          const { accessToken, userId } = data.result;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userId", String(userId));

          console.log("data>> ", data);
          addToast("로그인에 성공했어요.", "success");
          if (data.result.temporaryPassword) {
            router.push("/find-pw");
            addToast("임시 비밀번호를 변경해주세요.", "warning");
          }
        },
        onError: (error) => {
          console.log("error>> ", error);
          if (error.code === "AUTH401-INVALID_CREDENTIALS") {
            addToast("아이디 또는 비밀번호가 일치하지 않아요.", "warning");
          } else {
            addToast("잠시 후 다시 시도해 주세요.", "error");
          }
        },
      }
    );
  });

  const isDisabled = !isValid || isPending;

  return (
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
        <Button type="submit" ariaLabel="로그인 버튼" variant="auth" disabled={isDisabled}>
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
  );
};

export default EmailLoginForm;
