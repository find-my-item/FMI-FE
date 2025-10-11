import Icon from "@/components/Icon/Icon";
import { Chip } from "@/components";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";
import NoticeDetailHeader from "@/app/(route)/notice/_components/NoticeDetailHeader";
import NoticeChip from "@/app/(route)/notice/_components/NoticeChip";

interface PostDetailProps {
  type: "find" | "lost" | "notice" | "customer";
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
  find: { label: "습득" as const, backPath: "/find" as const },
  lost: { label: "분실" as const, backPath: "/lost" as const },
  notice: { label: "공지사항" as const, backPath: "/notice?tab=notice" as const },
  customer: { label: "문의내역" as const, backPath: "/notice?tab=customer" as const },
};

const PostDetail = ({ type, item }: PostDetailProps) => {
  const { label, backPath } = LABELS[type];
  const isBoardType = type === "find" || type === "lost";

  return (
    <article className="w-full">
      {isBoardType ? <PostDetailHeader /> : <NoticeDetailHeader backPath={backPath} />}

      <section
        className={`flex flex-col ${isBoardType ? "gap-12 px-[20px] py-[27px]" : "px-[20px]"}`}
      >
        <div>
          {isBoardType ? <Chip label={label} /> : <NoticeChip label={label} />}

          <div className={isBoardType ? "mt-[14px]" : "space-y-[28px]"}>
            <div>
              <h1 className="text-[20px] font-semibold">{item.title}</h1>
              <time className="text-[14px] leading-[20px] text-[#9D9D9D]">30분 전</time>
            </div>

            <p className="mt-[24px] leading-[22px]">{item.body}</p>

            <ul className="mt-[32px] flex gap-[20px] text-[14px] leading-[20px] text-[#5D5D5D]">
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
        </div>

        <section className="mt-[39px] flex flex-col gap-[16px]">
          {isBoardType && (
            <>
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
            </>
          )}
        </section>
      </section>
    </article>
  );
};

export default PostDetail;
