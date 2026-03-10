import { usePatchProfile } from "@/api/fetch/user";
import { FormEvent } from "react";
import { useFormContext } from "react-hook-form";

interface useProfileFormSubmitProps {
  preNickname?: string;
  preProfileImg?: string;
  onNoChange?: () => void;
}

const useProfileFormSubmit = ({
  preNickname,
  preProfileImg,
  onNoChange,
}: useProfileFormSubmitProps) => {
  const { getValues } = useFormContext();

  const { mutate: PatchUserMeMutate } = usePatchProfile();

  // 폼 제출 함수
  const handleSubmitMypageProfile = (e: FormEvent) => {
    e.preventDefault();

    const isNickname = getValues("nickname");
    const isProfileImg = getValues("profileImg");

    const ChangeImg = preProfileImg !== isProfileImg;
    const ChangeNickname = preNickname !== isNickname;

    // 바뀐 항목이 없음
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

    PatchUserMeMutate(formData);
  };

  return {
    handleSubmitMypageProfile,
  };
};

export default useProfileFormSubmit;
