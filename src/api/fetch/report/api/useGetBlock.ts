import useAppQuery from "@/api/_base/query/useAppQuery";
import { BlockResult } from "../types/BlockResponse";

const useGetBlock = () => {
  return useAppQuery<BlockResult>("public", ["user-block-list"], `/reports/block-list`);
};

export default useGetBlock;
