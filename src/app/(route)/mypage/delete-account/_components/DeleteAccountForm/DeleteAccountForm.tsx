"use client";

import { RadioOptionItem } from "@/components/common";
import { useState } from "react";

const RadioConfig = [
  { value: "NOT_USING", label: "잘 사용하지 않아요" },
  { value: "LOW_TRUST", label: "서비스에 대한 신뢰도가 낮아요" },
  { value: "DIFFICULT_TO_USE", label: "사용이 어려워요" },
  { value: "DUPLICATE_ACCOUNT", label: "다른 계정이 있어요" },
  { value: "UNPLEASANT_USER", label: "불쾌감을 주는 사용자를 만났어요" },
  { value: "UNFAIR_RESTRICTION", label: "억울하게 서비스 이용이 제한됐어요" },
  { value: "OTHER", label: "기타" },
];

const DeleteAccountForm = () => {
  const [isSelected, setIsSelected] = useState<string>("");
  return (
    <section>
      <h2 className="sr-only">탈퇴 선택 영역</h2>
      <form className="w-full gap-7 px-5 py-[30px] h-base">
        <h3 className="text-h3-semibold">탈퇴하시려는 이유를 알려주세요.</h3>

        <div className="">
          {RadioConfig.map((item) => (
            <RadioOptionItem
              key={item.value}
              option={item}
              selected={isSelected}
              onChange={setIsSelected}
              labelClassName="text-body1-semibold"
              inputName="회원 탈퇴 사유"
            />
          ))}
        </div>
      </form>
    </section>
  );
};

export default DeleteAccountForm;

// 탈퇴 사유 (WithdrawalReason):
// - `NOT_USING`: 잘 사용하지 않아요
// - `LOW_TRUST`: 서비스에 대한 신뢰도가 낮아요
// - `DIFFICULT_TO_USE`: 사용이 어려워요
// - `DUPLICATE_ACCOUNT`: 다른 계정이 있어요
// - `UNPLEASANT_USER`: 불쾌감을 주는 사용자를 만났어요
// - `UNFAIR_RESTRICTION`: 억울하게 서비스 이용이 제한됐어요
// - `OTHER`: 기타
