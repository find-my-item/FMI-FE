"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HamburgerIcon } from "@/icon/Hamburger";
import SideBar from "./SideBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full h-16 bg-gray-300 flex justify-between items-center p-4">
        <Link href="/" aria-label="홈으로 이동">
          Logo
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="select-none">
          <HamburgerIcon />
        </button>
      </header>
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
