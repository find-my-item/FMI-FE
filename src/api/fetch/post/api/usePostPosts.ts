import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostPostsWriteRequestBody, PostPostsWriteResponse } from "../types/PostWriteType";

export const usePostPosts = () => {
  return useAppMutation<PostPostsWriteRequestBody, PostPostsWriteResponse>(
    "auth",
    "/posts",
    "post"
  );
};

// useAppMutation<PostPostsWriteRequestBody, PostPostsWriteResponse>("auth", "/posts", "post"),
// {
//   onSuccess: () => {
//     addToast("게시글이 등록되었습니다.", "success");
//     router.push("/write/post");
//   },
// }
