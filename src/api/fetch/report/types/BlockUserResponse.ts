import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface BlockUserResponse extends ApiBaseResponseType<BlockUserResult[]> {}

export interface BlockUserResult {
  userId: number;
  nickname: string;
  profileImage: string;
}
