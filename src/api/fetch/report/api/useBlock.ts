import { AxiosError } from "axios";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import useAppMutation from "@/api/_base/query/useAppMutation";

interface UseBlockParams {
  invalidateKey?: QueryKey;
  onClose: () => void;
  userId: number;
}

const useBlock = ({ invalidateKey, onClose, userId }: UseBlockParams) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<void, unknown, AxiosError>("auth", `/reports/${userId}/block`, "post", {
    onSuccess: () => {
      toast.addToast("작성자를 차단했어요", "success");
      if (invalidateKey) queryClient.invalidateQueries({ queryKey: invalidateKey });
      onClose();
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast.addToast("이미 차단한 유저입니다", "error");
        return;
      }
      toast.addToast("작성자 차단에 실패했어요", "error");
    },
  });
};

export default useBlock;
