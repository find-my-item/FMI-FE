import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { NoticeDetailResponse } from "../types/NoticeDetailType";

type LikeOptimisticContext = {
  previous?: NoticeDetailResponse;
};

export const usePostNoticeLike = (id: number) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const queryKey = ["notice-detail", id] as const;

  return useAppMutation("auth", `/notices/${id}/like`, "post", {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<NoticeDetailResponse>(queryKey);

      queryClient.setQueryData<NoticeDetailResponse | undefined>(queryKey, (old) => {
        if (!old?.result) return old;

        if (old.result.likeStatus) return old;

        return {
          ...old,
          result: {
            ...old.result,
            likeStatus: true,
            likeCount: (old.result.likeCount ?? 0) + 1,
          },
        };
      });

      return { previous };
    },
    onSuccess: () => {
      addToast("공지사항 좋아요를 등록했어요", "success");
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    },
    onError: (_error, _variables, context) => {
      const typedContext = context as LikeOptimisticContext | undefined;

      if (typedContext?.previous) {
        queryClient.setQueryData(queryKey, typedContext.previous);
      }

      addToast("좋아요 등록에 실패했어요", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
