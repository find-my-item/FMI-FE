import React from "react";
import { ModalLayout } from "..";
import { cn } from "@/utils/cn";

interface ConfirmModalProps {
  title: React.ReactNode;
  description: React.ReactNode;
  icon?: string;
  isOpen: boolean;
  onClose: () => void;
}

const style = {
  baseBtn: "flex-1 flex-center font-semibold text-[16px] py-[10px] rounded-[10px]",
  trueBtn: "bg-[#1EB87B]/70 text-white glass-card",
  falseBtn: "bg-[#FFFFFF] text-gray-800 border border-[#CFCFCF]",
};

const ConfirmModal = ({ isOpen, onClose, title, description, icon }: ConfirmModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="gap-[24px] p-6 flex-col-center">
      <div className="gap-[16px] flex-col-center">
        {icon && <div>{icon}</div>}
        <div className="gap-[4px] flex-col-center">
          <div>{title}</div>
          <div>{description}</div>
        </div>
      </div>
      <div className="w-full gap-2 flex-center">
        <button className={cn(style.baseBtn, style.falseBtn)}>False</button>
        <button className={cn(style.baseBtn, style.trueBtn)}>True</button>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
