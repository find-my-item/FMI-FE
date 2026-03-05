import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface SignUpResponseType extends ApiBaseResponseType<{
  id: string;
  temporaryPassword: boolean;
}> {}
