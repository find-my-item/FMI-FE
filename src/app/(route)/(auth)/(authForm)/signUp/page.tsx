"use client";

import { useFormContext } from "react-hook-form";
import { signUpInputObject } from "../../_constant/FormData";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const Page = () => {
  const { handleSubmit } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <div className="flex-col-center flex min-h-screen w-full md:flex-row">
      <form onSubmit={onSubmit} className="flex w-full flex-col justify-between">
        <div className="w-full flex-1 gap-5 p-5">
          {signUpInputObject.map((item) => (
            <div className="flex min-h-[106px] w-full flex-row items-end">
              <Input
                key={item.name}
                name={item.name}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                validation={item.validation}
              />
              {item.name == "emailAuth" && <Button>인증번호 발송</Button>}
              {item.name == "nickname" && <Button>중복 확인</Button>}
            </div>
          ))}
        </div>

        <hr className="fixed bottom-[102px] left-0 h-px w-full bg-[#E4E4E4]" />
        <div className="fixed bottom-0 left-0 min-h-[102px] w-full px-5 py-3">
          <Button type="submit" label="회원가입 버튼">
            다음
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
