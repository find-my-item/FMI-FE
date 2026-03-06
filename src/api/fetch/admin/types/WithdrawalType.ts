import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { UserType } from "@/types";

export interface GetDeletedUsersResponse extends ApiBaseResponseType<WithdrawUseResult> {}

export interface WithdrawUseResult {
  content: WithdrawUserItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface WithdrawUserItem {
  userId: number;
  nickname: string;
  email: string;
  role: UserType;
  createdAt: string;
  deletedAt: string;
  withdrawalReason: string;
  withdrawalOtherReason: string | null;
}
