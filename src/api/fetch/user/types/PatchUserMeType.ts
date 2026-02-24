import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface PatchUsersMeResponse extends ApiBaseResponseType<PatchUserMeType> {}

interface PatchUserMeType {
  userId: number;
  nickname: string;
  email: string;
  profileImg: string;
  role: "USER" | "ADMIN";
}
