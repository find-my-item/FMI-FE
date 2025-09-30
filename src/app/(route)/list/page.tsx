"use client";

import { Tab } from "@/components";
import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

const page = () => {
  const [selected, setSelected] = useState("1");

  return (
    <div>
      <Tab
        tabs={[
          { key: "1", title: "분실", content: "분실" },
          { key: "2", title: "습득", content: "습득" },
        ]}
        selected={selected}
        onValueChange={setSelected}
      />
      <div className="h-[67px] w-full bg-black"></div>
      {/* 아이템 */}
      <div className="w-full">
        <div className="flex w-full gap-[14px] px-[20px] py-[30px]">
          <Image
            src="/images/list/1.png"
            alt=""
            width={92}
            height={100}
            className="rounded-[6px]"
          />
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="line-clamp-1 max-w-full truncate text-[18px] font-semibold text-[#242424]">
                  게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목
                </h2>
                <span className="text-[14px] leading-5 text-[#5D5D5D]">노원구 · 30분 전</span>
              </div>
              <p className="line-clamp-1 max-w-full truncate text-[14px] leading-[20px] text-[#9D9D9D]">
                서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-[14px] leading-[20px] text-[#9D9D9D]">
                <Icon name="Eye" />
                24
              </span>
              <span className="flex items-center gap-2 text-[14px] leading-[20px] text-[#9D9D9D]">
                <Icon name="Star" />
                12
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
