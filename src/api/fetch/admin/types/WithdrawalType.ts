import { PageResponse } from "@/api/_base/types/ApiBasePageableInfoType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { UserType, WithdrawalReason } from "@/types";

export interface GetDeletedUsersResponse extends ApiBaseResponseType<
  PageResponse<WithdrawUserItem>
> {}

export interface WithdrawUserItem {
  userId: number;
  nickname: string;
  email: string;
  role: UserType;
  createdAt: string;
  deletedAt: string;
  // withdrawalReason: WithdrawalReason[];
  withdrawalReason: WithdrawalReason;
  withdrawalOtherReason: string | null;
}
