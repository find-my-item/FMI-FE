import { RegisterOptions } from "react-hook-form";

type TermsType = {
  name: string;
  label: string;
  validation: RegisterOptions;
};

export const TERMS_CONFIG: TermsType[] = [
  { name: "termsOfService", label: "서비스 이용약관 (필수)", validation: { required: true } },
  {
    name: "privacyPolicy",
    label: "개인정보 수집 및 이용 동의 (필수)",
    validation: { required: true },
  },
  { name: "marketingConsent", label: "마케팅 수신 동의 (선택)", validation: { required: false } },
];
