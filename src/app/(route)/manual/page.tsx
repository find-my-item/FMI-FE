"use client";

import ManualPopup from "./_components/ManualPopup";
import { useState } from "react";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex-col-center">
        <h1>유시물 발생 시 메뉴얼</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-[16px] py-[12px] rounded-[12px] bg-[#04AD69] text-[16px] text-white"
        >
          메뉴얼 보기 버튼
        </button>
        <ManualPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

export default page;
