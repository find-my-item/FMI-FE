import { usePostPostsComments } from "@/api/fetch/comment";

export const useHandleReplySubmit = (id: number) => {
  const { mutate, isPending } = usePostPostsComments(id);

  const handleReplySubmit = (content: string, image: File | null, parentId: number) => {
    const formData = new FormData();
    const request = { postId: id, content, parentId };

    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
    if (image) formData.append("images", image);

    mutate(formData);
  };

  return {
    handleReplySubmit,
    isPending,
  };
};
