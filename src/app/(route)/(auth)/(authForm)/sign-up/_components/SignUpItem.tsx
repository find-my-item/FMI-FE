import { RegisterOptions, useFormContext } from "react-hook-form";
import InputText from "@/components/Input/InputText/InputText";
import { InputType } from "../../../_constant/FormData";

const InputStyle =
  "flex items-center relative w-full h-10 px-[14px] py-[12.5px] bg-[#F5F5F5] rounded-[10px] text-[#9D9D9D] text-[14px] border focus:outline-none";
const ButtonStyle =
  "w-full h-[50px] flex-center gap-1 rounded-[10px] bg-[#1EB87B] font-semibold text-[16px] text-white";
const signUpButtonStyle =
  "flex items-center justify-center min-w-[104px] h-10 text-[#5D5D5D] text-[14px] border border-[#CFCFCF] rounded-[10px] px-[10px] py-[14px]";

interface SignUpItemProps {
  item: InputType;
}

const SignUpItem = ({ item }: SignUpItemProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[item.name]?.message as string;
  const hasError = !!errorMessage;

  return (
    <InputText
      name={item.name}
      label={item.label}
      type={item.type}
      placeholder={item.placeholder}
      validation={item.validation}
      rule={item.rule}
      eyeShow={item.eyeShow}
      errorMessage={errorMessage}
      hasError={hasError}
    >
      {item.btnText}
    </InputText>
  );
};

export default SignUpItem;
