import { RegisterOptions, useFormContext } from "react-hook-form";
import InputText from "@/components/Input/InputText/InputText";
import { InputType } from "../../../_constant/FormData";

const InputStyle =
  "flex items-center relative w-full h-10 px-[14px] py-[12.5px] bg-[#F5F5F5] rounded-[10px] text-[#9D9D9D] text-[14px] border focus:outline-none";
const ButtonStyle =
  "w-full h-[50px] flex-center gap-1 rounded-[10px] bg-[#1EB87B] font-semibold text-[16px] text-white";
const signUpButtonStyle =
  "flex items-center justify-center min-w-[104px] h-10 text-[#5D5D5D] text-[14px] border border-[#CFCFCF] rounded-[10px] px-[10px] py-[14px]";

const SignUpItem = ({
  name,
  label,
  type,
  placeholder,
  validation,
  rule,
  eyeShow,
  btnText,
}: InputType) => {
  const {
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string;
  const hasError = !!errorMessage;

  return (
    <InputText
      name={name}
      validation={validation}
      label={label}
      type={type}
      placeholder={placeholder}
      eyeShow={eyeShow}
      errorMessage={errorMessage}
      hasError={hasError}
      rule={rule}
      // 버튼 사이즈 확인 필요
    >
      {btnText}
    </InputText>
  );
};

export default SignUpItem;
