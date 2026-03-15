import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface BlockUserResponse extends ApiBaseResponseType<BlockUserResult> {}

export interface BlockUserResult {
  content: BlockUserItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface BlockUserItem {
  userId: number;
  nickname: string;
  profileImage: string;
}
