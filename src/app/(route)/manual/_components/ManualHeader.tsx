"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ManualHeader = () => {
  const router = useRouter();

  return (
    <div className="w-full h-[60px] px-[20px] flex items-center justify-start gap-[3px]">
      <button className="w-[30px] h-[30px]" onClick={() => router.back()}>
        꺾쇠
      </button>
      <h1 className="text-[20px] font-semibold text-[#242424]">유실물 발생 시 매뉴얼</h1>
    </div>
  );
};

export default ManualHeader;
