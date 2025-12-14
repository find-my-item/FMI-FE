import { useFormContext } from "react-hook-form";
import { Button, InputText } from "@/components";
import { useRouter } from "next/navigation";
import { ApiFindPassword } from "@/app/api/ApiFindPassword";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { FIND_PW_ERROR } from "../_constants/FIND_PW_ERROR";
import { cn } from "@/utils";

const FindPwForm = () => {
  const { mutate } = ApiFindPassword();
  const { addToast } = useToast();

  const router = useRouter();

  const { handleSubmit } = useFormContext();

  const [email, setEmail] = useState("");

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        setEmail(data.email);
      },
      onError: (error) => {
        const target = FIND_PW_ERROR[error.code as keyof typeof FIND_PW_ERROR];
        if (target) addToast(target.message, target.status);
        else addToast("잠시 후 다시 시도해주세요.", "error");
      },
    });
  };

  return (
    <form
      className={cn(
        "flex h-[191px] min-h-screen w-full flex-col gap-[10px] px-5 py-[30px]",
        email && "px-9"
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!email ? (
        <InputText
          label="아이디(이메일)"
          type="text"
          placeholder="아이디(이메일)을 입력해 주세요."
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식을 입력해주세요.",
            },
          }}
          btnType="submit"
        >
          비밀번호 찾기
        </InputText>
      ) : (
        <>
          <p className="flex h-[77px] flex-col justify-center text-center text-body2-regular">
            <span>
              <span className="text-flatGreen-500">{email}</span> 으로
            </span>
            임시 비밀번호를 발송했습니다.
          </p>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              if (email) {
                router.push("/login");
              }
            }}
            ariaLabel="로그인 화면으로 이동"
          >
            비밀번호 변경
          </Button>
        </>
      )}
    </form>
  );
};

export default FindPwForm;
