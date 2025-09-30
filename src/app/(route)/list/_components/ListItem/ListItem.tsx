import Image from "next/image";
import Icon from "@/components/Icon/Icon";

const VIEW_ITEM = [
  {
    icon: "Eye",
    count: 24,
  },
  {
    icon: "Star",
    count: 12,
  },
] as const;

const ListItem = () => {
  return (
    <div className="duration-130 flex w-full cursor-pointer items-center gap-[14px] border-b border-b-[#E4E4E4] px-[20px] py-[30px] transition-colors hover:bg-[#F9F9F9]">
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
            <h2 className="u-ellipsis w-full text-[18px] font-semibold text-[#242424]">
              게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목
            </h2>
            <span className="text-[14px] leading-5 text-[#5D5D5D]">노원구 · 30분 전</span>
          </div>
          <p className="u-ellipsis w-full text-[14px] leading-[20px] text-[#9D9D9D]">
            서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다
          </p>
        </div>
        <div className="mt-2 flex gap-2">
          {VIEW_ITEM.map((item) => (
            <span className="flex items-center gap-2 text-[14px] leading-[20px] text-[#9D9D9D]">
              <Icon name={item.icon} size={16} />
              {item.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
