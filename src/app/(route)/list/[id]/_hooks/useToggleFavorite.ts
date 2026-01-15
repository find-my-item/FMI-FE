import { usePostFavorites } from "@/api/fetch/post";
import { useDeletePostFavorites } from "@/api/fetch/post/api/useDeleteFavorites";

interface ToggleFavoriteProps {
  postId: number;
}

export const useToggleFavorite = ({ postId }: ToggleFavoriteProps) => {
  const { mutate: postFavorite, isPending: postPending } = usePostFavorites(postId);
  const { mutate: deleteFavorite, isPending: deletePending } = useDeletePostFavorites(postId);

  const handleToggleFavorite = (favoriteStatus: boolean) => {
    favoriteStatus ? deleteFavorite({ postId }) : postFavorite({ postId });
  };

  return {
    handleToggleFavorite,
    isPending: postPending || deletePending,
  };
};
