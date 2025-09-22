"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";
import ManualItem from "./_components/ManualItem";

const manualList = [
  {
    title: "분실",
    content: "분실 매뉴얼",
  },
  {
    title: "습득",
    content: "습득 매뉴얼",
  },
  {
    title: "도난",
    content: "도난 매뉴얼",
  },
];

const page = () => {
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
      <ManualItem />
      <ManualItem />
      <ManualItem />
      <ManualItem />
    </div>
  );
};

export default page;
