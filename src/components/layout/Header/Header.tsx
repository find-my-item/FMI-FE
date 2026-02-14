// TODO(지권): 컴포넌트 사용 미확정

"use client";

import { useState } from "react";
import Link from "next/link";
import { useHiddenPath } from "@/hooks";
import SideBar from "./_internal/SideBar";
import Icon from "@/components/common/Icon/Icon";

/**
 * @author jikwon
 *
 * 상단 header 컴포넌트입니다.
 *
 * useHiddenPath 훅을 사용하여 / 메인 페이지에만 header를 표시합니다.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isHidden = useHiddenPath();
  if (isHidden) return null;

  return (
    <>
      <header className="fixed left-1/2 top-0 z-10 flex h-16 w-full max-w-[390px] -translate-x-1/2 items-center justify-between bg-gray-300 p-4">
        <Link href="/" aria-label="홈으로 이동">
          <Icon name="Logo" size={40} />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="select-none">
          <Icon name="Menu" title="메뉴 열기" />
        </button>
      </header>
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
