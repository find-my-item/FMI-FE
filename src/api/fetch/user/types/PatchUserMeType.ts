import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { UserType } from "@/types";

export interface PatchUsersMeResponse extends ApiBaseResponseType<PatchUserMeType> {}

interface PatchUserMeType {
  userId: number;
  nickname: string;
  email: string;
  profileImg: string;
  role: UserType;
}
