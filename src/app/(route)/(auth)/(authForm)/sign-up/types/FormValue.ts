export type FormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreements: {
    termsofService: boolean;
    privacyPolicy: boolean;
    marketing: boolean;
  };
};
