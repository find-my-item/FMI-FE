import React from "react";

type TabItem = {
  id: string;
  label: string;
};

interface TabProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  tabs: TabItem[];
  selected: string;
  onValueChange: (id: string) => void;
}

const style = {
  base: "p-3 cursor-pointer hover:bg-gray-100 mouse-hover",
  selected: "border-b-2 font-bold border-blue-500",
  unselected: "text-gray-500 border border-b-0 border-black rounded-t-lg",
};

const Tab = ({ tabs, selected, onValueChange, ...props }: TabProps) => {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${style.base} ${selected === tab.id ? style.selected : style.unselected}`}
          onClick={() => onValueChange(tab.id)}
          {...props}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tab;
