import Image from "next/image";
import Icon from "@/components/Icon/Icon";

const ListItem = () => {
  return (
    <div className="flex w-full items-center gap-[14px] px-[20px] py-[30px]">
      <Image
        src="/test_list.JPG"
        alt="아이템 이미지"
        width={92}
        height={100}
        className="h-[100px] w-[92px] rounded-[6px]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-semibold text-[#242424]">
              게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목
            </h2>
            <span className="text-[14px] leading-5 text-[#5D5D5D]">노원구 · 30분 전</span>
          </div>
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[20px] text-[#9D9D9D]">
            서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다
          </p>
        </div>
        <div className="mt-2 flex gap-2">
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
  );
};

export default ListItem;
