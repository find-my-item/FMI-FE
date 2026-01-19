import { useMemo } from "react";
import { throttle } from "lodash";
import { useDeletePostFavorites, usePostFavorites } from "@/api/fetch/post";

interface ToggleFavoriteProps {
  postId: number;
}

export const useToggleFavorite = ({ postId }: ToggleFavoriteProps) => {
  const { mutate: postFavorite, isPending: postPending } = usePostFavorites(postId);
  const { mutate: deleteFavorite, isPending: deletePending } = useDeletePostFavorites(postId);

  const handleToggleFavorite = useMemo(
    () =>
      throttle((favoriteStatus: boolean) => {
        favoriteStatus ? deleteFavorite({ postId }) : postFavorite({ postId });
      }, 300),
    [postId, postFavorite, deleteFavorite]
  );

  return {
    handleToggleFavorite,
    isPending: postPending || deletePending,
  };
};
