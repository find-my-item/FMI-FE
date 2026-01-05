import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostPostsFilterRequestBody, PostPostsFilterResponse } from "../types/PostsFilterType";

export const usePostPostsFilter = () => {
  return useAppMutation<PostPostsFilterRequestBody, PostPostsFilterResponse>(
    "public",
    "/post/filter",
    "post"
  );
};
