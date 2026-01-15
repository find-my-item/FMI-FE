import { useToast } from "@/context/ToastContext";
import useAppMutation from "@/api/_base/query/useAppMutation";
import {
  PostFavoritesWriteRequestBody,
  PostFavoritesWriteResponse,
} from "../types/PostFavoritesType";
import { useQueryClient } from "@tanstack/react-query";

export const usePostFavorites = (id: number) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<PostFavoritesWriteRequestBody, PostFavoritesWriteResponse>(
    "auth",
    `/posts/${id}/favorites`,
    "post",
    {
      onSuccess: () => {
        addToast("즐겨찾기가 등록되었습니다.", "success");
        queryClient.invalidateQueries({
          queryKey: ["post-detail", id],
        });
      },
      onError: () => {
        addToast("즐겨찾기 등록에 실패했습니다.", "error");
      },
    }
  );
};
