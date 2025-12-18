import useAppQuery from "../useAppQuery";

export const useGetPost = ({ page, size }: { page: number; size: number }) => {
  return useAppQuery("public", ["post"], `/post/${page}/${size}`);
};
