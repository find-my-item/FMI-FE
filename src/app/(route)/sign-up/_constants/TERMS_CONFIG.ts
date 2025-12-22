export const TERMS_CONFIG = [
  { name: "termsOfServiceAgreed", label: "서비스 이용약관 (필수)", validation: { required: true } },
  {
    name: "privacyPolicyAgreed",
    label: "개인정보 수집 및 이용 동의 (필수)",
    validation: { required: true },
  },
  { name: "marketingConsent", label: "마케팅 수신 동의 (선택)", validation: { required: false } },
] as const;
