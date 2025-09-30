import { cn } from "@/utils/cn";
import React from "react";

type TabItem = {
  title: string;
  content: string;
  key: string;
};

interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  tabs: TabItem[];
  selected: string;
  onValueChange: (key: string) => void;
}

const Tab = ({ tabs, selected, onValueChange, ...buttonProps }: TabProps) => {
  return (
    <div className="flex w-full border-b border-[#ADADAD] px-[20px]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          {...buttonProps}
          className={cn(
            "flex-center h-[60px] flex-1 text-[20px] font-semibold text-[#ADADAD]",
            selected === tab.key && "border-b-2 border-[#04AD69] text-[#04AD69]"
          )}
          onClick={() => onValueChange(tab.key)}
          type="button"
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tab;
