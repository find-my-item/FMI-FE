"use no memo";

import { Icon, Button, CheckBox, DetailHeader } from "@/components";
import { useFormContext, useWatch } from "react-hook-form";
import { TERMS_CONFIG } from "../../_constant/TERMS_CONFIG";
import { useEffect, useState } from "react";

interface AllAgreeProps {
  onOpenDetail: (termKey: string) => void;
  onComplete: () => void;
}

const AllAgree = ({ onOpenDetail, onComplete }: AllAgreeProps) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // 다음 버튼을 누르기 위한 disabled 장치

  const { register, setValue, control, getFieldState } = useFormContext();

  const selectAll = useWatch({ control, name: "selectAll" });
  const termsValue = useWatch({ control, name: TERMS_CONFIG.map((item) => item.name) });

  // 전체약관동의 체크 박스 토글 함수
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked; // 현재 체크 상태

    // 개별 항목 모두 체크
    TERMS_CONFIG.forEach((item) => {
      setValue(item.name, checked, { shouldValidate: true, shouldDirty: true });
    });
    setValue("selectAll", checked, { shouldValidate: false, shouldDirty: false }); // 전체 항목 체크
  };

  // 개별 체크박스와 전체 체크박스 동기화
  const allChecked =
    Array.isArray(termsValue) && termsValue.length === TERMS_CONFIG.length
      ? termsValue.every(Boolean)
      : false;

  if (selectAll !== allChecked) {
    setValue("selectAll", allChecked, { shouldValidate: false, shouldDirty: false });
  }

  const isTermsOfService = getFieldState("termsOfService").invalid; // 필수 약관 확인 (통과하면 false)
  const isPrivacyPolicy = getFieldState("privacyPolicy").invalid; // 필수 약관 확인 (통과하면 false)

  useEffect(() => {
    setIsFormValid(!isTermsOfService && !isPrivacyPolicy);
  }, [isTermsOfService, isPrivacyPolicy, isFormValid]);

  return (
    <>
      <DetailHeader title="회원가입" />
      <div className="flex w-full flex-col gap-7 p-4">
        <p className="text-h3-semibold text-black">
          서비스 이용을 위해 <br />
          약관 동의가 필요합니다.
        </p>

        <div className="flex min-h-[272px] w-full flex-col gap-8">
          <div className="flex min-h-[68px] w-full items-center border-b border-divider-default text-body1-semibold text-neutral-normal-default">
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
            {TERMS_CONFIG.map((item, index) => (
              <div
                key={item.name}
                className="flex h-[44px] w-full items-center justify-between text-body1-semibold text-neutral-normal-default"
              >
                <CheckBox
                  id={item.name}
                  label={item.label}
                  {...register(item.name, item.validation)}
                  state={!!termsValue?.[index]}
                />
                <button
                  className="bg-white"
                  type="button"
                  aria-label="상세 약관 열기"
                  onClick={() => onOpenDetail(item.name)}
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
        <Button
          type="submit"
          ariaLabel="회원가입 버튼"
          onClick={onComplete}
          variant="auth"
          disabled={!isFormValid}
        >
          동의
        </Button>
      </div>
    </>
  );
};

export default AllAgree;
