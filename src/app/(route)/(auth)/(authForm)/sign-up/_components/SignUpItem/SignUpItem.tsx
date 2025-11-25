"use no memo";

import { InputType } from "../../../types/InputType";
import { InputText, Toast } from "@/components";
import useAppMutation from "@/api/query/useAppMutation";
import { useState } from "react";

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
  // const { mutate, data, error, isPending } = useAppMutation<
  //   { email: string },
  //   { isSuccess: boolean; code: string; message: string; result: string }
  // >("auth", "auth/email/send-code", "post", {
  //   onSuccess: (data) => {
  //     console.log("data>>> ", data);
  //     return (<Toast message="인증번호가 발송되었습니다." type="success" />);
  //   },
  //   onError: (error) => {
  //     console.log("error>> ", error);
  //   },
  // });
  const [showToast, setShowToast] = useState<{
    show: boolean;
    type: "success" | "error" | "warning";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const postEmail = (name: string) => {
    if (name === "email") {
      // mutate({ email: name });
      setShowToast({ show: true, type: "success", message: "인증번호가 발송되었습니다." });
      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, show: false }));
      }, 2000);
    }
    if (name === "emailAuth") {
      setShowToast({ show: true, type: "error", message: "인증번호가 일치하지 않습니다." });
      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, show: false }));
      }, 2000);
    }
    if (name === "nickname") {
      setShowToast({ show: true, type: "warning", message: "이미 사용중인 닉네임입니다." });
      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, show: false }));
      }, 2000);
    }
  };

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
        btnOnClick={() => postEmail(item.name)}
      >
        {item.btnText}
      </InputText>
      {showToast.show && <Toast message={showToast.message} type={showToast.type} />}
    </div>
  );
};

export default SignUpItem;
