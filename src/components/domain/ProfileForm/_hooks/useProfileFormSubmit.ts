import { usePatchProfile } from "@/api/fetch/user";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useFormContext } from "react-hook-form";

interface useProfileFormSubmitProps {
  preProfileImg?: string;
  onConfirmRequest?: (submitFn: () => void) => void;
  isNicknameVerified: boolean;
}

export const useProfileFormSubmit = ({
  preProfileImg,
  onConfirmRequest,
  isNicknameVerified,
}: useProfileFormSubmitProps) => {
  const router = useRouter();
  const { getValues } = useFormContext();
  const { mutate: PatchUserMeMutate } = usePatchProfile();

  // 실제 API 호출을 수행하는 로직
  const executeMutation = (formData: FormData) => {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    PatchUserMeMutate(formData, {
      onSuccess: () => router.push("/mypage"),
    });
  };

  // 폼 제출 핸들러
  const handleSubmitMypageProfile = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    const isProfileImg = getValues("profileImg");
    const ChangeImg = preProfileImg !== isProfileImg;

    const requestData: { nickname?: string; deleteProfileImage?: boolean } = {};
    if (isNicknameVerified) {
      requestData.nickname = getValues("nickname");
    }
    if (ChangeImg && !isProfileImg) {
      requestData.deleteProfileImage = true;
    }
    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );

    if (ChangeImg && isProfileImg) {
      formData.append("profileImage", isProfileImg);
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
