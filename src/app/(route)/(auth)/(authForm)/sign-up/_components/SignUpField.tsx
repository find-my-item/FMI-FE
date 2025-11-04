"use no memo";

import { SIGNUP_INPUT_DATA } from "../../../_constant/FormData";
import { Button } from "@/components";
import SignUpItem from "./SignUpItem";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <div className="flex w-full flex-col gap-5 p-4">
        {SIGNUP_INPUT_DATA.map((item) => (
          <SignUpItem key={item.name} item={item} />
        ))}
      </div>
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-[#E4E4E4] bg-white px-4 py-3">
        <Button type="button" ariaLabel="회원가입 폼 버튼" onClick={onNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
