import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface BlockResponse extends ApiBaseResponseType<BlockResult> {}

export type BlockResult = number[];
