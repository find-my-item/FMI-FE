"use client";

import Icon from "@/components/Icon/Icon";
import { useRouterBack } from "@/utils/useRouterBack";
import { createContext } from "react";

const DetailHeaderContext = createContext({ title: "" });

interface DetailHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

const DetailHeader = ({ title = "", children }: DetailHeaderProps) => {
  const { back } = useRouterBack();

  return (
    <DetailHeaderContext.Provider value={{ title }}>
      <div className="flex h-[56px] w-full items-center justify-between px-[20px]">
        <div className="flex items-center justify-start gap-[8px]">
          <button className="h-[30px] w-[30px]" onClick={() => back()} aria-label="뒤로가기">
            <Icon name="ArrowLeftSmall" size={30} />
          </button>
          <h1 className="text-[20px] font-semibold text-[#242424]">{title}</h1>
        </div>

        {children}
      </div>
    </DetailHeaderContext.Provider>
  );
};

DetailHeader.Search = ({ ...props }) => {
  return (
    <button {...props}>
      <Icon name="Search" />
    </button>
  );
};

DetailHeader.Save = ({ ...props }) => {
  const isDisabledStyle = props.disabled ? "text-[#98E3BD]" : "text-[#1EB87B]";
  return (
    <button {...props} className={isDisabledStyle}>
      저장
    </button>
  );
};

DetailHeader.Star = ({ isActive, ...props }: { isActive: boolean }) => {
  return (
    <button {...props}>
      <Icon name="Star" />
    </button>
  );
};

DetailHeader.Share = ({ ...props }) => {
  return (
    <button {...props}>
      <Icon name="Share" />
    </button>
  );
};

DetailHeader.Menu = ({ ...props }) => {
  return (
    <button {...props}>
      <Icon name="DetailMenu" />
    </button>
  );
};

export default DetailHeader;
