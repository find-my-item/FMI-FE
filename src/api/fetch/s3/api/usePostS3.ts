import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export const usePostS3 = () => {
  return useAppMutation<FormData, ApiBaseResponseType<string[]>>("auth", "/s3/upload", "post");
};
