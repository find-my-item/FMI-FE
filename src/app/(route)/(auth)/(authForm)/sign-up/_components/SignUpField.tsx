import { signUpInputObject } from "../../../_constant/FormData";
import Button from "@/components/Button/Button";
import SignUpItem from "./SignUpItem";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <div className="flex w-full flex-col gap-5 p-4">
        {signUpInputObject.map((item) => (
          <SignUpItem
            key={item.name}
            name={item.name}
            label={item.label}
            type={item.type}
            placeholder={item.placeholder}
            validation={item.validation}
            rule={item.rule}
            eyeShow={item.eyeShow}
          />
        ))}
      </div>
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-[#E4E4E4] bg-white px-4 py-3">
        <Button type="button" label="회원가입 폼 버튼" onClick={onNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
