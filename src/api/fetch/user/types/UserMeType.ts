import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetUserMeResponse extends ApiBaseResponseType<UserMeType> {}

interface UserMeType {
  userId: number;
  nickname: string;
  email: string;
  profileImg: string;
}
