import useAppQuery from "@/api/_base/query/useAppQuery";
import { BlockUserResponse } from "../types/BlockUserResponse";

// TODO(지권): 무한 스크롤 여부 확인 필요
const useGetBlockUser = () => {
  return useAppQuery<BlockUserResponse>("public", ["user-block-list"], `/reports/block`);
};

export default useGetBlockUser;
