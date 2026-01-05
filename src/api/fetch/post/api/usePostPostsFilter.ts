import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostPostsFilterRequestBody, PostPostsFilterResponse } from "../types/PostsFilterType";

export const usePostPostsFilter = () => {
  return useAppMutation<PostPostsFilterResponse, PostPostsFilterRequestBody>(
    "public",
    "/post/filter",
    "post"
  );
};
