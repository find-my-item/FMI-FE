"use no memo";

import { InputType } from "../../types/InputType";
import { InputText } from "@/components";

const style = {
  input:
    "flex items-center relative w-full h-10 px-[14px] py-[12.5px] bg-[#F5F5F5] rounded-[10px] text-[#9D9D9D] text-[14px] border focus:outline-none",
  button:
    "w-full h-[50px] flex-center gap-1 rounded-[10px] bg-[#1EB87B] font-semibold text-[16px] text-white",
  signUpButton:
    "flex items-center justify-center min-w-[104px] h-10 text-[#5D5D5D] text-[14px] border border-[#CFCFCF] rounded-[10px] px-[10px] py-[14px]",
};

interface SignUpItemProps {
  item: InputType;
}

const SignUpItem = ({ item }: SignUpItemProps) => {
  return (
    <div className="h-[96px]">
      <InputText
        name={item.name}
        label={item.label}
        type={item.type}
        placeholder={item.placeholder}
        validation={item.validation}
        rule={item.rule}
        eyeShow={item.eyeShow}
      >
        {item.btnText}
      </InputText>
    </div>
  );
};

export default SignUpItem;
