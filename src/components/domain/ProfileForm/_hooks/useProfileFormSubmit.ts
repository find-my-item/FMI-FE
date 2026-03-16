import { usePatchProfile } from "@/api/fetch/user";
import { FormEvent } from "react";
import { useFormContext } from "react-hook-form";

interface useProfileFormSubmitProps {
  preNickname: string;
  preProfileImg?: string;
  onNoChange: () => void;
  onConfirmRequest?: (submitFn: () => void) => void;
  onSuccess?: () => void;
}

export const useProfileFormSubmit = ({
  preNickname,
  preProfileImg,
  onNoChange,
  onConfirmRequest,
  onSuccess,
}: useProfileFormSubmitProps) => {
  const { getValues } = useFormContext();

  const { mutate: PatchUserMeMutate } = usePatchProfile();

  // 실제 API 호출을 수행하는 로직
  const executeMutation = (formData: FormData) => {
    PatchUserMeMutate(formData, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  // 폼 제출 핸들러
  const handleSubmitMypageProfile = (e: FormEvent) => {
    e.preventDefault();

    const isNickname = getValues("nickname");
    const isProfileImg = getValues("profileImg");

    const ChangeImg = preProfileImg !== isProfileImg;
    const ChangeNickname = preNickname !== isNickname;

    // 변경사항이 없는 경우
    if (!ChangeImg && !ChangeNickname) {
      onNoChange?.();
      return;
    }

    const formData = new FormData();

    if (ChangeNickname) {
      formData.append("nickname", isNickname);
    }

    if (ChangeImg) {
      if (isProfileImg) {
        formData.append("profileImage", isProfileImg);
      } else {
        formData.append("deleteProfileImage", "true");
      }
    }

    // 확인 모달이 필요한 경우 확인 후 실행하도록 콜백 전달
    if (onConfirmRequest) {
      onConfirmRequest(() => executeMutation(formData));
    } else {
      executeMutation(formData);
    }
  };

  return {
    handleSubmitMypageProfile,
  };
};
