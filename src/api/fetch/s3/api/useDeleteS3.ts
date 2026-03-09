import useAppMutation from "@/api/_base/query/useAppMutation";

export const useDeleteS3 = () => {
  return useAppMutation("auth", "/s3/delete", "delete");
};
