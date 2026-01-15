import { useToast } from "@/context/ToastContext";
import useAppMutation from "@/api/_base/query/useAppMutation";
import {
  PostFavoritesWriteRequestBody,
  PostFavoritesWriteResponse,
} from "../types/PostFavoritesType";
import { useQueryClient } from "@tanstack/react-query";

export const useDeletePostFavorites = (id: number) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<PostFavoritesWriteRequestBody, PostFavoritesWriteResponse>(
    "auth",
    `/posts/${id}/favorites`,
    "delete",
    {
      onSuccess: () => {
        addToast("즐겨찾기가 삭제되었습니다.", "success");
        queryClient.invalidateQueries({
          queryKey: ["post-detail", id],
        });
      },
      onError: () => {
        addToast("즐겨찾기 삭제에 실패했습니다.", "error");
      },
    }
  );
};
