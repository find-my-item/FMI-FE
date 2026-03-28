"use client";
"use no memo";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UsersMeType } from "@/api/fetch/user/types/UserMeType";
import { Icon, InputText, KebabMenu, ProfileAvatar } from "@/components/common";
import { FooterButton } from "@/components/domain";
import { useNicknameCheck } from "@/hooks/domain";
import { useProfileFormSubmit } from "../../_hooks/useProfileFormSubmit";
import { usePreventLeave } from "../../_hooks/usePreventLeave";
import { useChangeImg } from "../../_hooks/useChangeImg";
import MypageProfileModal from "../ProfileEditLeaveConfirmModal/ProfileEditLeaveConfirmModal";
import { useClickOutside } from "@/hooks";

interface ProfileFormProps {
  user?: UsersMeType;
  onConfirmRequest?: (submitFn: () => void) => void;
}

const ProfileForm = ({ user, onConfirmRequest }: ProfileFormProps) => {
  const { nickname, profileImg } = user ?? {};

  const {
    setValue,
    watch,
    formState: { isValid },
  } = useFormContext();

  const { handleClickNickname, isNicknameVerified, isNicknameDisabled } = useNicknameCheck();

  const [openModal, setOpenModal] = useState(false);
  const [openKebabMenu, setOpenKebabMenu] = useState(false);

  const ref = useClickOutside(() => setOpenKebabMenu(false));

  // 이미지 관련 처리
  const { handleChangeImg, handleButtonClick, previewImgUrl, resetImage, fileInputRef } =
    useChangeImg({
      setOpenKebabMenu,
      initialImg: profileImg,
      onImageChange: (file) => setValue("profileImg", file, { shouldDirty: true }),
    });

  // 최종 버튼 제출 함수
  const { handleSubmitMypageProfile } = useProfileFormSubmit({
    preNickname: nickname ?? "",
    preProfileImg: profileImg,
    onNoChange: () => setOpenModal(true),
    onConfirmRequest,
  });

  const [profileImgValue, nicknameValue] = watch(["profileImg", "nickname"]);
  const isImageChanged = profileImgValue instanceof File || profileImgValue === null;

  const canSubmit = isImageChanged || (nicknameValue && isValid && isNicknameVerified);

  const hasChanges = isImageChanged || nicknameValue;
  usePreventLeave(hasChanges, () => setOpenModal(true));

  return (
    <form className="flex w-full flex-col h-base">
      <div className="flex-1">
        <div className="flex justify-center py-[30px]">
          <div ref={ref} className="relative z-10 h-[80px] w-[80px]">
            <ProfileAvatar size={80} src={previewImgUrl} alt="프로필" priority={true} />
            <button
              className="absolute left-[52px] top-[52px] size-7 rounded-full bg-fill-neutral-strong-default flex-center"
              aria-label="프로필 이미지 변경 버튼"
              onClick={() => setOpenKebabMenu((prev) => !prev)}
              type="button"
            >
              <Icon name="CameraBorder" size={16} />
            </button>

            {/* 메뉴 */}
            {openKebabMenu && (
              <KebabMenu
                items={[
                  { text: "내 앨범에서 선택", onClick: handleButtonClick, type: "button" },
                  {
                    text: "프로필 이미지 삭제",
                    textColor: "text-system-warning",
                    onClick: resetImage,
                    type: "button",
                  },
                ]}
              />
            )}

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleChangeImg}
            />
          </div>
        </div>

        {/* 닉네임 input */}
        <div className="flex w-full flex-col gap-5 p-5">
          <InputText
            inputOption={{
              name: "nickname",
              disabled: isNicknameDisabled,
              placeholder: nickname,
              maxLength: 10,
              validation: {
                required: true,
                maxLength: 10,
              },
              onKeyDown: (e) => {
                if (e.key === " ") e.preventDefault();
                if (e.key === "Enter") e.preventDefault();
              },
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\s/g, "");
              },
            }}
            label="닉네임"
            btnOption={{
              btnLabel: "중복 확인",
              onClick: () => {
                handleClickNickname("nickname");
              },
            }}
            caption={{
              rule: "2~10자, 특수문자/금칙어 제한",
              isSuccess: isNicknameVerified,
              successMessage: "사용할 수 있는 닉네임이에요",
            }}
          />
        </div>

        <MypageProfileModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      </div>

      <FooterButton type="button" disabled={!canSubmit} onClick={handleSubmitMypageProfile}>
        설정 완료
      </FooterButton>
    </form>
  );
};

export default ProfileForm;
