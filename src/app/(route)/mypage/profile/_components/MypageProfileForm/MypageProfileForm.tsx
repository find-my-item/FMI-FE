import { InputText, Button, Icon } from "@/components";

const MypageProfileForm = () => {
  const handleSubmitMypageProfile = () => {
    // TODO(수현): 폼 제출 함수 추가 예정
  };

  return (
    <form onSubmit={handleSubmitMypageProfile} className="flex h-dvh w-full flex-col">
      <div className="flex justify-center py-[30px]">
        <div className="relative h-[80px] w-[80px]">
          <Icon name="UserProfile" size={80} />
          {/* TODO(수현): 디자인 토큰 변경 요청 해놓은 상태로 등록 시 추후 변경 */}
          <button
            className="absolute left-[52px] top-[52px] h-[28px] w-[28px] rounded-full bg-[#f5f5f5] flex-center"
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

      <div className="sticky bottom-0 mt-auto h-[88px] w-full border-t border-divider-default bg-white px-4 py-3">
        <Button type="submit" variant="auth" ariaLabel="설정완료 버튼">
          설정 완료
        </Button>
      </div>
    </form>
  );
};

export default MypageProfileForm;
