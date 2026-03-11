import useAppQuery from "@/api/_base/query/useAppQuery";
import { BlockUserResponse } from "../types/BlockUserResponse";

const useGetBlockUser = () => {
  return useAppQuery<BlockUserResponse>("public", ["user-block-list"], `/reports/block`);
};

export default useGetBlockUser;
