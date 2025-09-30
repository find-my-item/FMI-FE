"use client";

import React, { useState } from "react";
import Link from "next/link";
import SideBar from "./SideBar";
import Icon from "../Icon/Icon";
import { useHiddenPath } from "@/hooks/useHiddenPath";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isHidden = useHiddenPath();
  if (isHidden) return null;

  return (
    <>
      <header className="sticky top-0 flex h-16 w-full items-center justify-between bg-gray-300 p-4">
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
