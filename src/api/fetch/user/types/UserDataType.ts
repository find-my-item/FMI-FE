import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetUserDataResponse extends ApiBaseResponseType<UserDataType> {}

export interface UserDataType {
  userId: string;
  email: string;
  emailVerified: boolean;
  profileImg: string;
}

// TODO(지권): 추후 백엔드 스키마에 따라 타입 정의 변경
export type UserTabType = "post" | "comment" | "favorite";
