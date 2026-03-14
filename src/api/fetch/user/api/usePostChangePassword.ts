import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useToast } from "@/context/ToastContext";

interface ApiPostChangePasswordType {
  newPassword: string;
  newPasswordConfirm: string;
}

export const usePostChangePassword = () => {
  const { addToast } = useToast();

  return useAppMutation<ApiPostChangePasswordType, ApiBaseResponseType<string>>(
    "auth",
    "/users/me/password",
    "patch",
    {
      onSuccess: () => {
        addToast("비밀번호 변경이 완료되었어요", "success");
      },
      onError: () => {
        addToast("비밀번호 변경에 실패했어요", "error");
      },
    }
  );
};
