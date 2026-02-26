import { useNicknameCheck } from "@/hooks/domain/useNicknameCheck/useNicknameCheck";
import { Button, Icon, InputText, KebabMenu, ProfileAvatar } from "@/components/common";
import { FooterButton } from "@/components/domain";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import useChangeImg from "../../_hooks/useChangeImg";
import { UsersMeType } from "@/api/fetch/user/types/UserMeType";
import useProfileFormSubmit from "../../_hooks/useProfileFormSubmit";
import MypageProfileModal from "../MypageProfileModal/MypageProfileModal";

interface MypageProfileFormProps {
  user?: UsersMeType;
}

const MypageProfileForm = ({ user }: MypageProfileFormProps) => {
  const { nickname, profileImg } = user ?? {};

  const { setValue } = useFormContext();

  const { handleClickNickname } = useNicknameCheck();

  // 버튼 클릭 제어
  const [openMenu, setOpenMenu] = useState(false);

  // 모달 제어
  const [openModal, setOpenModal] = useState(false);

  const { handleChangeImg, handleButtonClick, previewImgUrl, resetImage, fileInputRef } =
    useChangeImg({
      setOpenMenu,
      initialImg: profileImg,
      onImageChange: (file) => setValue("profileImg", file, { shouldDirty: true }),
    });

  const { handleSubmitMypageProfile } = useProfileFormSubmit({
    preNickname: nickname,
    preProfileImg: profileImg,
  });

  return (
    <form className="flex w-full flex-col h-base">
      <div className="flex justify-center py-[30px]">
        <div className="relative h-[80px] w-[80px]">
          <ProfileAvatar size={80} src={previewImgUrl} alt="프로필" priority={true} />
          {/* TODO(수현): 디자인 토큰 변경 요청 해놓은 상태로 등록 시 추후 변경 */}
          <button
            className="absolute left-[52px] top-[52px] h-[28px] w-[28px] rounded-full bg-fill-neutral-strong-default flex-center"
            aria-label="프로필 이미지 변경 버튼"
            onClick={() => setOpenMenu((prev) => !prev)}
            type="button"
          >
            <Icon name="CameraBorder" size={16} />
          </button>

          {/* 메뉴 */}
          {openMenu && (
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
            // TODO(수현): 기존 닉네임이 placeholder로 들어갈 예정
            placeholder: nickname,
            maxLength: 10,
            validation: {
              required: true,
              maxLength: 10,
            },
          }}
          label="닉네임"
          btnOption={{
            btnLabel: "중복 확인",
            onClick: () => {
              handleClickNickname("nickname");
            },
          }}
          caption={{ rule: "2~10자, 특수문자/금칙어 제한" }}
        />
      </div>
      <Button type="button" onClick={() => setOpenModal(true)}>
        테스트 버튼
      </Button>
      <MypageProfileModal isOpen={openModal} onClose={() => setOpenModal(false)} />

      <FooterButton
        label="설정 완료"
        type="button"
        // TODO(수현): 기능 구현 브랜치로 disabled 제어 함수 추가 예정
        // disabled={ }
        onClick={handleSubmitMypageProfile}
      />
    </form>
  );
};

export default MypageProfileForm;
