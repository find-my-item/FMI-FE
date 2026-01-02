export interface ApiBaseResponseType<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
