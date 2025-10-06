import Icon from "@/components/Icon/Icon";
import Link from "next/link";

interface ListDetailProps {
  type: "find" | "lost";
  item: {
    id: number;
    title: string;
    body: string;
    comments?: {
      id: number;
      author: string;
      date: string;
      content: string;
      replyTo?: string;
    }[];
  };
}

const LABELS = {
  find: { label: "습득", backPath: "/find" },
  lost: { label: "분실", backPath: "/lost" },
};

const ListDetail = ({ type, item }: ListDetailProps) => {
  const { label, backPath } = LABELS[type];

  return (
    <article className="w-full">
      <div className="h-[260px] bg-[#D9D9D9]" />

      <section className="flex flex-col items-start justify-center gap-5 border-b border-[#E4E4E4] p-[20px]">
        <div className="flex items-center justify-start gap-[14px]">
          <div className="h-10 w-10 rounded-full bg-[#D9D9D9]" />
          <div className="flex flex-col items-start justify-center">
            <p className="text-[16px]">글자확인용임시닉네임</p>
            <span className="text-[14px] leading-[20px] text-[#5D5D5D]">
              작성글 13 · 현재 채팅 2
            </span>
          </div>
        </div>
        <Link
          href={"/"}
          className="flex-center w-full rounded-[6px] bg-[#1EB87B] py-[14px] font-semibold text-white"
        >
          채팅하러 가기
        </Link>
      </section>

      <section className="flex flex-col gap-12 px-[20px] py-[27px]">
        <div className="">
          <span className="text-[14px] font-semibold text-green-500">{label}</span>

          <div>
            <h1 className="text-[20px] font-semibold">{item.title}</h1>
            <time className="text-[14px] leading-[20px] text-[#9D9D9D]">30분 전</time>
          </div>

          <p className="leading-[22px]">{item.body}</p>

          <ul className="flex gap-[20px] text-[14px] leading-[20px] text-[#5D5D5D]">
            <li className="flex gap-[4px]">
              <Icon name="Star" size={20} title="즐겨찾기" />
              <span>즐겨찾기 12</span>
            </li>
            <li className="flex gap-[4px]">
              <Icon name="EyeOpen" size={20} aria-hidden="true" />
              <span>조회 24</span>
            </li>
          </ul>
        </div>

        <section className="flex flex-col gap-[16px]">
          <div className="h-[180px] rounded-md bg-black"></div>
          <address className="flex items-center gap-[6px]">
            <Icon name="Position" size={16} aria-hidden="true" />
            <p className="text-[14px]">서울특별시 00구 00동</p>
            <Icon name="ArrowRightSmall" size={16} title="지도 이동" />
          </address>
        </section>
      </section>
    </article>
  );
};

export default ListDetail;
