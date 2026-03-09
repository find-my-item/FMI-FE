import { usePatchProfile } from "@/api/fetch/user";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { addToast } = useToast();

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
        formData.append("profileImageUrl", isProfileImg);
      } else {
        formData.append("profileImageUrl", "null");
      }
    }

    console.log("닉네임>> ", isNickname, "이미지>>> ", isProfileImg);
    // PatchUserMeMutate(formData, {
    //   onSuccess: () => {
    //     // router.push("/mypage");
    //     addToast("프로필 이미지 변경 성공", "success");
    //   },
    //   onError: (error) => {
    //     if (error.code === "USER404-NOT_FOUND") {
    //       addToast("회원이 아니에요. 로그인을 해주세요", "warning");
    //     }
    //     if (error.code === "AUTH409-NICKNAME_DUPLICATED") {
    //       addToast("이미 사용 중인 닉네임이에요. 다른 닉네임으로 다시 시도해 주세요.", "warning");
    //     }
    //   },
    // });
  };

  return {
    handleSubmitMypageProfile,
  };
};

export default useProfileFormSubmit;
