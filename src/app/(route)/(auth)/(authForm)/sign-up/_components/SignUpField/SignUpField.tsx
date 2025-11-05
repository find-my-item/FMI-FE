"use no memo";

import { SIGNUP_INPUT_DATA } from "@/app/(route)/(auth)/_constant/FormData";
import { Button } from "@/components";
import SignUpItem from "../SignUpItem/SignUpItem";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  // TODO(수현): 닉네임 입력 칸 maxLength 적용 필요
  // TODO(수현): input maxLength 적용 필요
  // TODO(수현): input 텍스트에 placeholder 스타일이 적용 됨
  // TODO(수현): input 위에 생기는 아이콘 밑으로 텍스트가 가려짐
  return (
    <>
      <div className="flex w-full flex-col gap-5 p-4">
        {SIGNUP_INPUT_DATA.map((item) => (
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
