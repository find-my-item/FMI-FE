export type FormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreements: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    marketing: boolean;
  };
};
