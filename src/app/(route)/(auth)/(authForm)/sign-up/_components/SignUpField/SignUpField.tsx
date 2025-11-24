"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constant/SIGNUP_INPUT_CONFIG";
import { Button } from "@/components";
import SignUpItem from "../SignUpItem/SignUpItem";
import useAppMutation from "@/api/query/useAppMutation";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const postEmail = useAppMutation<
    { email: string },
    {
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }
  >("auth", "auth/email/send-code", "post", {
    onSuccess: (data) => {
      console.log("data>>> ", data);
    },
    onError: (error) => {
      console.log("error>> ", error);
    },
  });

  return (
    <>
      <div className="flex w-full flex-col gap-5 p-4">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <SignUpItem key={item.name} item={item} />
        ))}
      </div>
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-flatGray-50 bg-white px-4 py-3">
        <Button type="button" ariaLabel="회원가입 폼 버튼" onClick={onNext} className="w-full">
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
