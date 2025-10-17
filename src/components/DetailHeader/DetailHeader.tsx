"use client";

import Icon from "@/components/Icon/Icon";
import { useRouterBack } from "@/utils/useRouterBack";
import { ButtonHTMLAttributes, createContext } from "react";

const DetailHeaderContext = createContext({ title: "" });

interface DetailHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
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
        <div className="flex gap-[23.5px]">{children}</div>
      </div>
    </DetailHeaderContext.Provider>
  );
};

DetailHeader.Search = ({ ariaLabel = "검색", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Search" />
    </button>
  );
};

DetailHeader.Save = ({ ariaLabel = "게시글 저장", ...props }: BaseButtonProps) => {
  const isDisabledStyle = props.disabled ? "text-[#98E3BD]" : "text-[#1EB87B]";
  return (
    <button {...props} className={isDisabledStyle} aria-label={ariaLabel}>
      저장
    </button>
  );
};

DetailHeader.Star = ({
  ariaLabel = "즐겨찾기 추가",
  isActive,
  ...props
}: BaseButtonProps & { isActive: boolean }) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Star" />
    </button>
  );
};

DetailHeader.Share = ({ ariaLabel = "공유", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Share" />
    </button>
  );
};

DetailHeader.Menu = ({ ariaLabel = "게시글 상세 메뉴", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="DetailMenu" />
    </button>
  );
};

export default DetailHeader;
