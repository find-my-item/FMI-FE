"use client";

import React, { useState } from "react";
import Link from "next/link";
import SideBar from "./SideBar";
import Icon from "../Icon/Icon";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full h-16 bg-gray-300 flex justify-between items-center p-4">
        <Link href="/" aria-label="홈으로 이동">
          Logo
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
