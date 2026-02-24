import { useGetUsersMe } from "@/api/fetch/user";
import { useNicknameCheck } from "@/hooks/domain/useNicknameCheck/useNicknameCheck";
import { Icon, InputText, KebabMenu, ProfileAvatar } from "@/components/common";
import { FooterButton } from "@/components/domain";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useChangeImg from "../../_hooks/useChangeImg";
import { usePatchUsersMe } from "@/api/fetch/user/api/usePatchUsersMe";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const MypageProfileForm = () => {
  const { data, error } = useGetUsersMe();

  const { mutate: PatchUserMeMutate } = usePatchUsersMe();
  const router = useRouter();
  const { addToast } = useToast();

  if (error) {
    addToast("프로필 정보를 불러오지 못했어요.", "error");
  }
  const [isNickname, setIsNickname] = useState(data?.result?.nickname ?? "");

  // 닉네임 훅
  const { handleClickNickname, nicknameValue } = useNicknameCheck();

  // 버튼 클릭 제어
  const [openMenu, setOpenMenu] = useState(false);

  // 이미지 관련 로직
  const { handleChangeImg, handleButtonClick, previewImgUrl, setPreviewImgUrl, fileInputRef } =
    useChangeImg({ setOpenMenu, profileImg: data?.result?.profileImg });

  // 폼 제출 함수
  const handleSubmitMypageProfile = () => {
    // 이미지가 바뀌지 않았는지 확인하는 불리언 변수 - 바뀌지 않았음 true
    const ChangeImg = data?.result?.profileImg !== previewImgUrl;

    // 닉네임이 바뀌지 않았는지 확인하는 불리언 변수 - 바뀌지 않았음 true
    const ChangeNickname = data?.result?.nickname !== isNickname;

    // 바뀐 항목이 없음
    if (!ChangeImg && !ChangeNickname) {
      // TODO(수현): 바뀐 요소들이 없는데 설정 완료 버튼을 눌렀을 때의 상황의 임시 토스트 - 변경 예정
      addToast("변경사항이 없어요.", "warning");
      return;
    }
    console.log("nickname>>> ", isNickname);
    console.log("previewImg>>> ", previewImgUrl);

    // PatchUserMeMutate({
    //   ...(ChangeNickname && { nickname: isNickname }),
    //   ...(ChangeImg && { profileImageUrl: previewImgUrl }),
    // }, {
    //   onSuccess: () => {
    //     router.push("/mypage");
    //   }, onError: (error) => {
    //     if (error.code === "USER404-NOT_FOUND") {
    //       addToast("회원이 아니에요. 로그인을 해주세요", "warning");
    //     }
    //     if (error.code === "AUTH409-NICKNAME_DUPLICATED") {
    //       addToast("이미 사용 중인 닉네임이에요. 다른 닉네임으로 다시 시도해 주세요.", "warning");
    //     }
    //   }
    // })
  };

  return (
    <form className="flex h-dvh w-full flex-col">
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
                  onClick: () => {
                    setPreviewImgUrl(null);
                    setIsNickname(nicknameValue);
                  },
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
        type="button"
        // TODO(수현): 기능 구현 브랜치로 disabled 제어 함수 추가 예정
        // disabled={ }
        onClick={handleSubmitMypageProfile}
      />
    </form>
  );
};

export default MypageProfileForm;
