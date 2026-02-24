"use client";

import { ReactNode } from "react";
import { cn } from "@/utils";

interface MainSearchLayoutProps {
  focused: boolean;
  children: ReactNode;
}

const MainSearchLayout = ({ focused, children }: MainSearchLayoutProps) => {
  const isDropdownOpen = focused;

  return (
    <div
      className={cn(
        isDropdownOpen &&
          "fixed inset-x-0 bottom-0 top-0 z-[9999] mx-auto max-w-[768px] bg-white px-5 py-3",
        !focused &&
          "fixed left-1/2 top-0 z-10 w-full max-w-[768px] -translate-x-1/2 bg-transparent px-5 py-[10px]"
      )}
    >
      {children}
    </div>
  );
};

export default MainSearchLayout;
