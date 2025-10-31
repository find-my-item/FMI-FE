import { Input } from "@/components";
import { InputStyle, signUpButtonStyle } from "../../../_constant/authStyle";
import { cn } from "@/utils/cn";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Button from "@/components/Button/Button";
import InputText from "@/components/Input/InputText/InputText";
import { InputType } from "../../../_constant/FormData";

// const BUTTON_CONFIG: Record<string, { text: string; className: string }> = {
//   email: { text: "인증번호 발송", className: signUpButtonStyle },
//   emailAuth: { text: "인증번호 확인", className: signUpButtonStyle },
//   nickname: { text: "중복 확인", className: cn(signUpButtonStyle, "min-w-[100px]") },
// };

// interface SignUpItemProps {
//   name: string;
//   label?: string;
//   type: string;
//   placeholder: string;
//   validation?: RegisterOptions;
//   rule?: string;
//   eyeShow?: boolean;
// }

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
    register,
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string;
  const hasError = (!!touchedFields[name] || isSubmitted) && !!errorMessage;

  return (
    <InputText
      name={name}
      registeration={register(name, validation)}
      label={label}
      type={type}
      placeholder={placeholder}
      eyeShow={eyeShow}
      errorMessage={errorMessage}
      hasError={hasError}
      // 버튼 사이즈 확인 필요
    >
      {btnText}
    </InputText>

    //     {/* 에러 확인 및 규칙 안내 */}
    //     {(showError || rule) && (
    //       <p className={cn("text-[12px]", showError ? "text-red-500" : "text-[#787878]")}>
    //         {showError ? fieldError : rule}
    //       </p>
    //     )}
  );

  // return (
  //   <div className="flex min-h-[96px] w-full flex-col gap-2" key={name}>
  //     {/* label */}
  //     <label htmlFor={name} className="text-[14px] text-[#363636]">
  //       {label}
  //       {validation?.required && <span className="text-[#1EB87B]">*</span>}
  //     </label>

  //     {/* input */}
  //     <div className="flex w-full flex-row items-end gap-[10px]" key={name}>
  //       <Input
  //         name={name}
  //         type={type}
  //         className={cn(InputStyle, showError && "border-[#FF4242] bg-[#E4E4E4]")}
  //         placeholder={placeholder}
  //         eyeShow={eyeShow}
  //       />
  //       {/* button */}
  //       {currentButtonConfig && (
  //         <Button className={currentButtonConfig.className} ariaLabel={currentButtonConfig.text}>
  //           {currentButtonConfig.text}
  //         </Button>
  //       )}
  //     </div>

  //     {/* 에러 확인 및 규칙 안내 */}
  //     {(showError || rule) && (
  //       <p className={cn("text-[12px]", showError ? "text-red-500" : "text-[#787878]")}>
  //         {showError ? fieldError : rule}
  //       </p>
  //     )}
  //   </div>
  // );
};

export default SignUpItem;
