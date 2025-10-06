import Icon from "@/components/Icon/Icon";
import ItemDetailHeader from "./ItemDetailHeader";
import { Chip } from "@/components";

interface PostDetailProps {
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

const PostDetail = ({ type, item }: PostDetailProps) => {
  const { label, backPath } = LABELS[type];

  return (
    <article className="w-full">
      <ItemDetailHeader />

      <section className="flex flex-col gap-12 px-[20px] py-[27px]">
        <div>
          <Chip label={label} />

          <div className="mt-[14px]">
            <h1 className="text-[20px] font-semibold">{item.title}</h1>
            <time className="text-[14px] leading-[20px] text-[#9D9D9D]">30분 전</time>
          </div>

          <p className="mt-[24px] leading-[22px]">{item.body}</p>

          <ul className="mt-[32px] flex gap-[20px] text-[14px] leading-[20px] text-[#5D5D5D]">
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
          <div className="h-[147px] rounded-md bg-black" />
          <address className="flex items-center gap-[6px] not-italic">
            <span className="flex items-center gap-[5px]">
              <Icon
                name="Position"
                size={16}
                aria-hidden="true"
                className="fill-current text-[#1EB87B]"
              />
              <p className="text-[14px]">서울특별시 00구 00동</p>
            </span>
            <Icon name="ArrowRight" size={14} title="지도 이동" />
          </address>
        </section>
      </section>
    </article>
  );
};

export default PostDetail;
