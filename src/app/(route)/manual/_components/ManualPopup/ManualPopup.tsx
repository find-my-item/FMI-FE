"use client";

import { Icon, PopupLayout } from "@/components";

interface ManualPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManualPopup = ({ isOpen, onClose }: ManualPopupProps) => {
  return (
    <PopupLayout isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md rounded-t-2xl bg-white px-6">
        <div className="mx-auto mb-6 mt-[71px] h-[74px] w-[74px] rounded-full">
          <Icon name="Book" size={74} />
        </div>

        <div className="text-center">
          <h1 className="mb-4 text-[20px] font-semibold leading-[26px] text-[#171717]">
            분실물이 있나요? <br />
            매뉴얼을 보면 더 도움이 돼요!
          </h1>
          <p className="text-[14px] leading-[22px] text-[#7D7D7D]">
            분실물 발생 시 도움이 되는 정보를 <br /> 매뉴얼에서 확인해 보세요.
          </p>
        </div>

        <div className="mb-[69px] mt-8 flex flex-col gap-3">
          <button className="h-[48px] w-full rounded-[12px] bg-[#04AD69] text-[18px] text-white">
            매뉴얼 보러가기
          </button>
          <button className="h-[64px] w-full text-[#04AD69]" onClick={onClose}>
            다음에 볼게요
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default ManualPopup;
