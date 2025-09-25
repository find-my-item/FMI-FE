"use client";

import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";
import React from "react";
import Icon from "../Icon/Icon";

interface ManualPopupProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ManualPopup = ({ isOpen, onClose }: ManualPopupProps) => {
  if (!isOpen) return null;

  useModalLockAndEsc({ isOpen, onClose });
  const onBackdropMouseDown = useModalBackdrop({ onClose });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/30"
      onMouseDown={onBackdropMouseDown}
    >
      <div className="w-full max-w-md rounded-t-2xl bg-white px-6">
        <div className="mx-auto mt-[71px] mb-6 h-[74px] w-[74px] rounded-full">
          <Icon name="Book" size={74} />
        </div>

        <div className="text-center">
          <h1 className="mb-4 text-[20px] leading-[26px] font-semibold text-[#171717]">
            분실물이 있나요? <br />
            매뉴얼을 보면 더 도움이 돼요!
          </h1>
          <p className="text-[14px] leading-[22px] text-[#7D7D7D]">
            분실물 발생 시 도움이 되는 정보를 <br /> 매뉴얼에서 확인해 보세요.
          </p>
        </div>

        <div className="mt-8 mb-[69px] flex flex-col gap-3">
          <button className="h-[48px] w-full rounded-[12px] bg-[#04AD69] text-[18px] text-white">
            로그인
          </button>
          <button className="h-[64px] w-full text-[#04AD69]" onClick={onClose}>
            다음에 볼게요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualPopup;
