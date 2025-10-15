import { CheckBox } from "@/components";
import Icon from "@/components/Icon/Icon";
import { useState } from "react";
import { AgreeConfig } from "../../../_constant/Agreement";

const AllAgree = () => {
  return (
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
          {AgreeConfig.map((item) => {
            const [checked, setChecked] = useState(false); // 체크 상태 관리
            return (
              <div
                key={item.name}
                className="flex h-[44px] w-full items-center justify-between text-[#5D5D5D]"
              >
                {/* 체크박스 */}
                <label htmlFor={item.name} className="flex cursor-pointer items-center">
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
                </label>

                <button className="bg-white">
                  <Icon name="ArrowRightSmall" size={24} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllAgree;
