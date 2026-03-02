"use client";

import { KebabMenu } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import {
  HeaderMenu,
  HeaderShare,
  HeaderStar,
} from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useClickOutside } from "@/hooks";
import { useState } from "react";

const NoticeDetailHeader = () => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const kebabMenuRef = useClickOutside(() => setIsKebabMenuOpen(false));

  return (
    <div className="relative" ref={kebabMenuRef}>
      <DetailHeader>
        <HeaderStar isActive={false} />
        <HeaderShare />
        <HeaderMenu onClick={() => setIsKebabMenuOpen((prev) => !prev)} />
      </DetailHeader>

      {isKebabMenuOpen && (
        <div className="absolute right-5 top-[54px] z-40">
          <KebabMenu
            items={[
              { text: "게시글 수정하기", icon: { name: "Edit" }, onClick: () => {} },
              { text: "게시글 삭제하기", icon: { name: "Trash" }, onClick: () => {} },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default NoticeDetailHeader;
