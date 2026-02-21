import { useApiCheckNickname } from "@/api/fetch/auth";
import { useGetUsersMe } from "@/api/fetch/user";
import { useNicknameCheck } from "@/hooks/domain/useNicknameCheck/useNicknameCheck";
import { Icon, InputText, KebabMenu, ProfileAvatar } from "@/components/common";
import { FooterButton } from "@/components/domain";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useChangeImg from "../../_hooks/useChangeImg";

const MypageProfileForm = () => {
  const { handleClickNickname } = useNicknameCheck();

  const { data, isLoading, error } = useGetUsersMe({});

  const [isNickname, setIsNickname] = useState("");

  useEffect(() => {
    if (data?.result?.nickname) setIsNickname(data.result?.nickname);
  }, [data]);

  // 버튼 클릭 제어
  const [openMenu, setOpenMenu] = useState(false);

  // 이미지 관련 로직
  const { handleChangeImg, handleButtonClick, previewImgUrl, setPreviewImgUrl, fileInputRef } =
    useChangeImg({ setOpenMenu });

  // 폼 제출 함수
  const handleSubmitMypageProfile = () => {
    // TODO(수현): 폼 제출 함수 추가 예정
  };

  return (
    <form onSubmit={handleSubmitMypageProfile} className="flex h-dvh w-full flex-col">
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
                  onClick: () => setPreviewImgUrl(""),
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
            placeholder: isNickname,
            maxLength: 10,
            validation: {
              required: true,
              maxLength: 10,
            },
          }}
          label="닉네임"
          btnOption={{
            btnLabel: "중복 확인",
            onClick: () => handleClickNickname("nickname"),
          }}
          caption={{ rule: "2~10자, 특수문자/금칙어 제한" }}
        />
      </div>

      <FooterButton
        label="설정 완료"
        // TODO(수현): 기능 구현 브랜치로 disabled 제어 함수 추가 예정
        // disabled={ }
      />
    </form>
  );
};

export default MypageProfileForm;
