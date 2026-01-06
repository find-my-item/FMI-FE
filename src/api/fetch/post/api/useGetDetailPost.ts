import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetDetailPostResponse } from "../types/PostDetailType";

export const useGetDetailPost = ({ id }: { id: number }) => {
  return useAppQuery<GetDetailPostResponse>("public", ["post-detail", id], `/posts/${id}`);
};
