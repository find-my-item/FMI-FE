import clsx from "clsx";
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
    <div className="h-[600px] p-4">
      <div className="flex items-center gap-2">
        <Link href="/notice" className="h-[30px] w-[30px]" aria-label="뒤로가기">
          <Icon name="ArrowLeftSmall" size={30} />
        </Link>
        <h1 className="text-xl font-bold">{noticeItem?.title}</h1>
      </div>
      <p className="border-b-2 pb-4 text-right text-sm text-gray-500">30분 전</p>
      <div className="mt-4">{noticeItem?.body}</div>
    </div>
  );
};

export default NoticeDetail;
