import useApiLogout from "@/api/fetch/auth/api/useApiLogout";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const { mutate: logoutMutate } = useApiLogout();
  const { addToast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        addToast("로그아웃 되었어요.", "success");
        router.replace("/");
      },
      onError: () => {
        addToast("로그아웃에 실패했어요. 다시 시도해주세요.", "error");
      },
    });
  };

  return { handleLogout };
};

export default useLogout;
