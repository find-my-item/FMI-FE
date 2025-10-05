import Icon from "@/components/Icon/Icon";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-start justify-center gap-4 border-b border-[#E4E4E4] px-5 py-6">
        <div className="h-[104px] w-[104px] rounded-[6px] bg-black" />
        <span className="text-[14px] text-[#9D9D9D]">
          * jpg, jpeg, png 파일을 첨부해 주세요. (선택)
        </span>
      </div>

      <div className="flex items-center justify-between border-b border-[#E4E4E4] px-5 py-6">
        <span className="text-[16px] text-[#9D9D9D]">
          카테고리를 선택해 주세요. <span className="text-[#1EB87B]">*</span>
        </span>
        <button className="h-4 w-4">
          <Icon name="ArrowDown" size={16} />
        </button>
      </div>

      <div className="flex items-center justify-between border-b border-[#E4E4E4] px-5 py-6">
        <span className="text-[16px] text-[#9D9D9D]">
          제목을 입력해 주세요. <span className="text-[#1EB87B]">*</span>
        </span>
      </div>

      <div className="border-b border-[#E4E4E4] px-5 py-6">
        <span className="text-[16px] text-[#9D9D9D]">
          내용을 입력해 주세요. <span className="text-[#1EB87B]">*</span>
        </span>
        <textarea
          name=""
          id=""
          placeholder="분실/습득 날짜, 물건 종류, 물건의 특징 등 유실물 찾기에 도움이 되는 내용을 작성해 주세요."
          className="w-full border-b border-[#E4E4E4] px-5 py-6 placeholder:text-[14px]"
        ></textarea>
      </div>

      <div className="flex items-center justify-between border-b border-[#E4E4E4] px-5 py-6">
        <span className="text-[16px] text-[#9D9D9D]">
          위치를 등록해 주세요. <span className="text-[#1EB87B]">*</span>
        </span>
        <button>
          <Icon name="ArrowRightSmall" />
        </button>
      </div>

      <div className="px-5 pb-10 pt-3">
        <button className="w-full rounded-[12px] bg-[#F5F5F5] px-[94px] py-5 text-[18px] font-bold text-[#D9D9D9]">
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default page;
