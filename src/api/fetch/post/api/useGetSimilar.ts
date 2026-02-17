import { GetSimilarResponse } from "../types/SimilarType";
import useAppQuery from "@/api/_base/query/useAppQuery";

export const useGetSimilar = ({ postId }: { postId: number }) => {
  return useAppQuery<GetSimilarResponse>(
    "public",
    ["similar", postId],
    `/post2s/${postId}/similar`,
    {
      throwOnError: true,
      suspense: true,
      enabled: !!postId,
    }
  );
};
