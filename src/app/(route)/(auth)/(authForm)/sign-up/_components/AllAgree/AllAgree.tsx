import { Icon, Button, CheckBox } from "@/components";
import { useFormContext, useWatch } from "react-hook-form";

// TODO(수현): constants 분리 및 대문자 컨벤션 적용 필요
const Terms = [
  { key: "termsOfService", name: "서비스 이용약관 (필수)", required: true },
  { key: "privacyPolicy", name: "개인정보 수집 및 이용 동의 (필수)", required: true },
  { key: "marketingConsent", name: "마케팅 수신 동의 (선택)", required: false },
];

interface AllAgreeProps {
  onOpenDetail: (termKey: string) => void;
  onComplete: () => void;
}

const AllAgree = ({ onOpenDetail, onComplete }: AllAgreeProps) => {
  const { register, setValue, control } = useFormContext();

  const selectAll = useWatch({ control, name: "selectAll" }); // 전체 선택
  const termsValue = useWatch({ control, name: Terms.map((item) => item.key) }); // 개별 선택

  // 전체약관동의 체크 박스 토글 함수
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked; // 현재 체크 상태

    // 개별 항목 모두 체크
    Terms.forEach((item) => {
      setValue(item.key, checked, { shouldValidate: true, shouldDirty: true });
    });
    setValue("selectAll", checked, { shouldValidate: false, shouldDirty: false }); // 전체 항목 체크
  };

  // 개별 체크박스와 전체 체크박스 동기화
  const allChecked =
    Array.isArray(termsValue) && termsValue.length === Terms.length
      ? termsValue.every(Boolean)
      : false;

  if (selectAll !== allChecked) {
    setValue("selectAll", allChecked, { shouldValidate: false, shouldDirty: false });
  }

  return (
    <>
      <div className="flex w-full flex-col gap-7 p-4">
        <p className="text-h3-semibold text-black">
          서비스 이용을 위해 <br />
          약관 동의가 필요합니다.
        </p>

        <div className="flex min-h-[272px] w-full flex-col gap-8">
          <div className="flex min-h-[68px] w-full items-center border-b border-[#CCCCCC] text-body1-semibold text-neutral-normal-default">
            {/* TODO(수현): checkbox 미체크 상태 아이콘 추가 필요 */}
            <CheckBox
              id="selectAll"
              label="전체 약관 동의"
              {...register("selectAll")}
              onChange={handleToggleAll}
              state={!!selectAll}
            />
          </div>

          {/* 각 약관 동의 */}
          <div className="flex min-h-[172px] w-full flex-col gap-5">
            {Terms.map((item, index) => (
              <div
                key={item.name}
                className="flex h-[44px] w-full items-center justify-between text-body1-semibold text-neutral-normal-default"
              >
                <CheckBox
                  id={item.key}
                  label={item.name}
                  {...register(item.key)}
                  state={!!termsValue?.[index]}
                />
                <button
                  className="bg-white"
                  type="button"
                  aria-label="상세 약관 열기"
                  onClick={() => onOpenDetail(item.key)}
                >
                  <Icon name="ArrowRightSmall" size={24} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* signUpFooter */}
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-flatGray-50 bg-white px-4 py-3">
        <Button type="submit" ariaLabel="회원가입 버튼" onClick={onComplete} variant="auth">
          동의
        </Button>
      </div>
    </>
  );
};

export default AllAgree;
