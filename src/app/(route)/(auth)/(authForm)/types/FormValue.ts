export type FormValue = {
  email: string;
  emailAuth: number;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreements: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    marketing: boolean;
  };
};
