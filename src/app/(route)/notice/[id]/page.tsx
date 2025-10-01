import { noticeListObject } from "../_constant/noticeListObject";
import Icon from "@/components/Icon/Icon";
import Link from "next/link";

interface NoticeDetailProps {
  params: Promise<{ id: string }>;
}

const NoticeDetail = async ({ params }: NoticeDetailProps) => {
  const { id } = await params;
  const noticeItem = noticeListObject.find((item) => item.id === Number(id));

  if (!noticeItem) return <div className="h-[600px] pt-4">존재하지 않는 공지사항입니다.</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-[15px] pl-[20px]">
        <Link href={"/notice"}>
          <Icon name="ArrowLeftSmall" size={30} />
        </Link>
      </div>

      <div className="h-[260px] bg-black"></div>
      <div className="px-[20px]">
        <div className="mb-[18px] mt-[51px] px-[18px] py-[6px]">
          <p className="text-[14px] font-semibold text-green-500">공지사항</p>
        </div>

        <div className="space-y-[28px]">
          <div>
            <h1 className="text-[20px] font-semibold">{noticeItem.title}</h1>
            <p className="text-[14px] leading-[20px] text-[#9D9D9D]">30분 전</p>
          </div>

          <p className="leading-[22px]">{noticeItem.body}</p>

          <div className="flex gap-[20px] text-[14px] leading-[20px] text-[5D5D5D]">
            <div className="flex gap-[4px]">
              <Icon name="Star" size={20} />
              <span>즐겨찾기 12</span>
            </div>
            <div className="flex gap-[4px]">
              <Icon name="EyeOpen" size={20} />
              <span>조회 24</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[16px]">
          <div className="mt-[39px] h-[180px] rounded-md bg-black"></div>
          <div className="flex items-center gap-[6px]">
            <Icon name="Position" size={16} />
            <p className="text-[14px]">서울특별시 00구 00동</p>
            <Icon name="ArrowRightSmall" size={16} />
          </div>
        </div>
      </div>

      <div className="mt-[95px] space-y-[12px] border-t border-[#E4E4E4] px-[20px]">
        <p className="mt-[27px] font-semibold text-[#242424]">댓글 3</p>
        <div className="flex gap-[16px]">
          <div className="h-[40px] w-[40px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#242424]">작성자1</p>
            <p className="text-[14px] text-[#9D9D9D]">2025.05.06</p>
          </div>
        </div>
        <p className="leading-[22px] text-[#242424]">
          서울시 노원구 00동 건물 화장실에서 핸드폰을 분실했어요. 혹시 습득하신 분이 계시면 채팅
          부탁드려요.
        </p>
      </div>

      <div className="mt-[22px] space-y-[12px] pl-[40px] pr-[20px]">
        <div className="flex gap-[16px]">
          <div className="h-[40px] w-[40px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#242424]">작성자1</p>
            <p className="text-[14px] text-[#9D9D9D]">2025.05.06</p>
          </div>
        </div>
        <p className="leading-[22px] text-[#242424]">
          <span className="mr-1 text-green-600">@작성자1</span>서울시 노원구 00동 건물 화장실에서
          핸드폰을 분실했어요. 혹시 습득하신 분이 계시면 채팅 부탁드려요.
        </p>
      </div>

      <div className="mt-[34px] space-y-[12px] px-[20px]">
        <div className="flex gap-[16px]">
          <div className="h-[40px] w-[40px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#242424]">작성자1</p>
            <p className="text-[14px] text-[#9D9D9D]">2025.05.06</p>
          </div>
        </div>
        <p className="leading-[22px] text-[#242424]">
          서울시 노원구 00동 건물 화장실에서 핸드폰을 분실했어요. 혹시 습득하신 분이 계시면 채팅
          부탁드려요.
        </p>
      </div>

      <div className="flex h-[60px] items-center justify-center border-b border-[#E4E4E4]">
        <button className="text-[#1EB87B]">댓글 더보기 2개</button>
      </div>
    </div>
  );
};

export default NoticeDetail;
