import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetUsersMeResponse extends ApiBaseResponseType<UsersMeType> {}

export interface UsersMeType {
  userId: number;
  nickname: string;
  email: string;
  profileImg: string;
}
