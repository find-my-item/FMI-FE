export interface ApiResponseType {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: string;
    verified: boolean;
  };
}
