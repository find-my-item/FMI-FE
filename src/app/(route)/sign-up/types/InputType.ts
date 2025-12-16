import { RegisterOptions } from "react-hook-form";

export type InputType = {
  name: string;
  label?: string;
  className?: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  rule?: string; // 닉네임 규칙 안내 문구
  eyeShow?: boolean;
  btnText?: string;
  successMessage?: string;
};
