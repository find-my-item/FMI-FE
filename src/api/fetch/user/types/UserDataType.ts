// TODO(형준): 파일 확인 필요

import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetUserDataResponse extends ApiBaseResponseType<UserDataType> {}

export interface UserDataType {
  userId: string;
  email: string;
  emailVerified: boolean;
  profileImg: string;
}

export type UserTabType = "posts" | "comments" | "favorites";
