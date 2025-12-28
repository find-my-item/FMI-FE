"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon/Icon";
import Bookmark from "@/components/common/Buttons/Bookmark/Bookmark";
import KebabMenuButton from "@/components/common/Buttons/KebabMenuButton/KebabMenuButton";

interface DetailHeaderProps {
  title?: string;
  children?: ReactNode;
}

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
}

const DetailHeader = ({ title = "", children }: DetailHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-[9999] flex h-[56px] w-full items-center justify-between bg-white px-5">
      <div className="flex items-center justify-start gap-2">
        <button
          className="h-[30px] w-[30px]"
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          <Icon name="ArrowLeftSmall" size={30} />
        </button>
        <h2 className="text-[20px] font-semibold text-flatGray-900">{title}</h2>
      </div>
      <nav className="flex gap-[23.5px]" aria-label="헤더 액션">
        {children}
      </nav>
    </header>
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
      임시 저장
    </button>
  );
};

DetailHeader.Star = (
  props: BaseButtonProps & { isActive: boolean; size?: "large" | "medium" | "small" }
) => {
  return <Bookmark {...props} />;
};

DetailHeader.Share = ({ ariaLabel = "공유", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Share" />
    </button>
  );
};

DetailHeader.Menu = (props: BaseButtonProps & { size?: "large" | "small" }) => {
  return <KebabMenuButton {...props} />;
};

DetailHeader.Setting = ({ ariaLabel = "알림 설정", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Setting" />
    </button>
  );
};

export default DetailHeader;
