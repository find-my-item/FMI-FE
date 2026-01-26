import { Icon, InputText, ProfileAvatar } from "@/components/common";
import { FooterButton } from "@/components/domain";

const MypageProfileForm = () => {
  const profileImgURL = "";

  const handleSubmitMypageProfile = () => {
    // TODO(수현): 폼 제출 함수 추가 예정
  };

  return (
    <form onSubmit={handleSubmitMypageProfile} className="flex h-dvh w-full flex-col">
      <div className="flex justify-center py-[30px]">
        <div className="relative h-[80px] w-[80px]">
          <ProfileAvatar size={80} src={null} alt="프로필" priority={true} />
          {/* TODO(수현): 디자인 토큰 변경 요청 해놓은 상태로 등록 시 추후 변경 */}
          <button
            className="absolute left-[52px] top-[52px] h-[28px] w-[28px] rounded-full bg-fill-neutral-strong-default flex-center"
            aria-label="프로필 이미지 변경 버튼"
          >
            <Icon name="CameraBorder" size={16} />
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-5 p-5">
        <InputText
          name="nickname"
          label="닉네임"
          // TODO(수현): 기존 닉네임이 placeholder로 들어갈 예정
          placeholder="기존 닉네임 표기"
          rule="2~10자, 특수문자/금칙어 제한"
          maxLength={10}
          validation={{
            required: true,
            maxLength: 10,
          }}
        >
          중복 확인
        </InputText>
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
