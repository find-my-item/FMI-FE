"use client";

import { Icon } from "@/components/common";

const Header = () => {
  return (
    <header className="fixed left-1/2 top-0 z-10 w-full max-w-[390px] -translate-x-1/2 px-5 py-[10px]">
      <div className="relative w-full rounded-[10px] bg-white px-5 py-4">
        <input
          type="text"
          className="w-full pl-8 text-h3-semibold text-flatGray-700 placeholder:text-flatGray-700"
          placeholder="현재 위치 (위치 정보 허용 시)"
        />
        <Icon name="Search" size={20} className="absolute top-[18.5px]" />
      </div>
    </header>
  );
};

export default Header;
