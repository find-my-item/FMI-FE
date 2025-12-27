import useAppQuery from "../query/useAppQuery";

export const useGetPost = ({ page, size, type }: { page: number; size: number; type?: string }) => {
  return useAppQuery("public", ["post"], `/post/?type=${type}&page=${page}&size=${size}`);
};
