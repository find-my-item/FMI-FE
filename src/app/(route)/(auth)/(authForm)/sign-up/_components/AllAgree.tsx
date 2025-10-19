import Icon from "@/components/Icon/Icon";
import { useState } from "react";
import Button from "@/components/Button/Button";
import { CheckBox } from "@/components";

type Props = {
  onOpenDetail: (termKey: string) => void;
  onBack: () => void;
  onComplete: () => void;
};

const Terms = [
  { key: "termsOfService", name: "서비스 이용약관 (필수)", required: true },
  { key: "privacyPolicy", name: "개인정보 수집 및 이용 동의 (필수)", required: true },
  { key: "marketingConsent", name: "마케팅 수신 동의 (선택)", required: false },
];

const AllAgree = ({ onOpenDetail, onBack, onComplete }: Props) => {
  const checkHandler = () => {};
  return (
    <>
      <div className="flex w-full flex-col gap-7 p-4">
        <h1 className="text-[18px] font-semibold text-[#171717]">
          서비스 이용을 위해 <br /> 약관 동의가 필요합니다.
        </h1>

        <div className="flex min-h-[272px] w-full flex-col gap-8">
          <div className="flex min-h-[68px] w-full items-center border-b border-[#CCCCCC] text-[#5D5D5D]">
            약관 전체 동의
          </div>

          {/* 각 약관 동의 */}
          <div className="flex min-h-[172px] w-full flex-col gap-5">
            {Terms.map((item) => {
              const [checked, setChecked] = useState(false); // 체크 상태 관리
              return (
                <div
                  key={item.name}
                  className="flex h-[44px] w-full items-center justify-between text-[#5D5D5D]"
                >
                  {/* 체크박스 */}
                  {/* <label htmlFor={item.name} className="flex cursor-pointer items-center">
                    <input
                      id={item.name}
                      type="checkbox"
                      className="peer sr-only"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <div className="relative h-6 w-6 rounded bg-[#E4E4E4] flex-center peer-checked:bg-[#1EB87B] peer-checked:opacity-70 [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100">
                      <Icon
                        name="Check"
                        title="체크됨"
                        className="absolute inset-0 m-auto h-2 peer-checked:opacity-100"
                      />
                    </div>
                    <span className="ml-3 text-[#9D9D9D]">{item.name}</span>
                  </label> */}
                  <CheckBox name={item.name} onCheck={checkHandler} />

                  <button className="bg-white" type="button" onClick={() => onOpenDetail(item.key)}>
                    <Icon name="ArrowRightSmall" size={24} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* signUpFooter */}
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-[#E4E4E4] bg-white px-4 py-3">
        <Button type="button" label="회원가입 버튼">
          동의
        </Button>
      </div>
    </>
  );
};

export default AllAgree;
