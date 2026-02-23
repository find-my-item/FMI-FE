import { AxiosError } from "axios";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { BLOCK_ERROR_MESSAGE } from "./BLOCK_ERROR_MESSAGE";
import { useRouter } from "next/navigation";

interface UseBlockParams {
  onClose: () => void;
  userId: number;
}

const useBlock = ({ onClose, userId }: UseBlockParams) => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useAppMutation<void, unknown, AxiosError>("auth", `/reports/${userId}/block`, "post", {
    onSuccess: () => {
      toast.addToast("작성자를 차단했어요", "success");
      queryClient.invalidateQueries({ queryKey: ["user-block-list"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.replace("/list");
      onClose();
    },
    onError: (error) => {
      const status = error.response?.status;

      if (status && BLOCK_ERROR_MESSAGE[status]) {
        toast.addToast(BLOCK_ERROR_MESSAGE[status], "error");
        return;
      }

      toast.addToast("작성자 차단에 실패했어요", "error");
    },
  });
};

export default useBlock;
