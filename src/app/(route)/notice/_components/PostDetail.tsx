import Link from "next/link";
import Icon from "@/components/Icon/Icon";

interface PostDetailProps {
  type: "notice" | "customer";
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
  notice: { label: "공지사항", backPath: "/notice" },
  customer: { label: "문의내역", backPath: "/customer" },
};

const PostDetail = ({ type, item }: PostDetailProps) => {
  const { label, backPath } = LABELS[type];

  return (
    <article className="w-full">
      <header className="flex items-center justify-between py-[15px] pl-[20px]">
        <Link href={backPath}>
          <Icon name="ArrowLeftSmall" size={30} />
        </Link>
      </header>

      <div className="h-[260px] bg-black"></div>

      <section className="px-[20px]">
        <div className="mb-[18px] mt-[51px] px-[18px] py-[6px]">
          <p className="text-[14px] font-semibold text-green-500">{label}</p>
        </div>

        <div className="space-y-[28px]">
          <div>
            <h1 className="text-[20px] font-semibold">{item.title}</h1>
            <time className="text-[14px] leading-[20px] text-[#9D9D9D]">30분 전</time>
          </div>

          <p className="leading-[22px]">{item.body}</p>

          <ul className="flex gap-[20px] text-[14px] leading-[20px] text-[#5D5D5D]">
            <li className="flex gap-[4px]">
              <Icon name="Star" size={20} />
              <span>즐겨찾기 12</span>
            </li>
            <li className="flex gap-[4px]">
              <Icon name="EyeOpen" size={20} />
              <span>조회 24</span>
            </li>
          </ul>
        </div>

        <section className="flex flex-col gap-[16px]">
          <div className="mt-[39px] h-[180px] rounded-md bg-black"></div>
          <address className="flex items-center gap-[6px]">
            <Icon name="Position" size={16} />
            <p className="text-[14px]">서울특별시 00구 00동</p>
            <Icon name="ArrowRightSmall" size={16} />
          </address>
        </section>
      </section>
    </article>
  );
};

export default PostDetail;
