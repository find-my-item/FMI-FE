import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface CheckCodeResponseType
  extends ApiBaseResponseType<{
    verified: boolean;
  }> {}
