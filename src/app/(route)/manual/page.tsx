"use client";

import { cn } from "@/utils/cn";
import ManualPopup from "../../../components/ManualPopup/ManualPopup";
import { useState } from "react";

const manualList = [
  {
    title: "분실",
    content: "분실 메뉴얼",
  },
  {
    title: "습득",
    content: "습득 메뉴얼",
  },
  {
    title: "도난",
    content: "도난 메뉴얼",
  },
];

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("분실");

  return (
    <div className="flex-col-center w-full">
      <div className="w-full px-[20px] flex border-b border-[#ADADAD]">
        {manualList.map((item) => (
          <button
            className={cn(
              "flex-1 h-[60px] flex-center font-semibold text-[20px] text-[#ADADAD]",
              selected === item.title && "border-b-2 border-[#04AD69] text-[#04AD69]"
            )}
            onClick={() => setSelected(item.title)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-[16px] py-[12px] rounded-[12px] bg-[#04AD69] text-[16px] text-white"
      >
        메뉴얼 보기 버튼
      </button>
      <ManualPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default page;
