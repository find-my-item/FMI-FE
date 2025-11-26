export type ResponseType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    verified: boolean;
  };
};
