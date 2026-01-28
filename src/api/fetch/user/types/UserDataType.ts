import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetUserDataResponse extends ApiBaseResponseType<UserDataType> {}

export interface UserDataType {
  userId: string;
  email: string;
  emailVerified: boolean;
  profileImg: string;
}

export type UserTabType = "posts" | "comments" | "favorites";
