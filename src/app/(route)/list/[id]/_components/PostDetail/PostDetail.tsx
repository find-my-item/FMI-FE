import { Chip, Icon } from "@/components";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";
import NoticeDetailHeader from "@/app/(route)/notice/_components/NoticeDetailHeader/NoticeDetailHeader";
import NoticeChip from "@/app/(route)/notice/_components/NoticeChip/NoticeChip";
import { cn } from "@/utils";

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
  find: { label: "습득", backPath: "/find" },
  lost: { label: "분실", backPath: "/lost" },
  notice: { label: "공지사항", backPath: "/notice?tab=notice" },
  customer: { label: "문의내역", backPath: "/notice?tab=customer" },
} as const;

const PostDetail = ({ type, item }: PostDetailProps) => {
  const { label, backPath } = LABELS[type];
  const isBoardType = type === "find" || type === "lost";

  return (
    <article className="w-full">
      {isBoardType ? <PostDetailHeader /> : <NoticeDetailHeader backPath={backPath} />}

      <section
        className={cn("flex flex-col", isBoardType ? "gap-12 px-[20px] py-[27px]" : "px-[20px]")}
      >
        <div>
          {isBoardType ? <Chip label={label} /> : <NoticeChip label={label} />}

          <div className={isBoardType ? "mt-[14px]" : "space-y-[28px]"}>
            <div>
              <h1 className="text-[20px] font-semibold text-layout-header-default">{item.title}</h1>
              <time className="text-[14px] leading-[140%] text-layout-body-default">30분 전</time>
            </div>

            <p className="mt-[24px] text-body1-regular text-layout-header-default">{item.body}</p>

            <ul className="mt-[32px] flex gap-[20px] text-body2-medium text-layout-body-default">
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

        <section className="flex flex-col gap-[18px]">
          {isBoardType && (
            <>
              {/* TODO(지권): 추후 지도 컴포넌트 변경 */}
              <div className="h-[147px] rounded-md bg-black" />
              <address className="flex items-center gap-[6px] not-italic">
                <span className="flex items-center gap-[5px]">
                  <Icon
                    name="Position"
                    size={16}
                    aria-hidden="true"
                    className="fill-current text-brand-subtle-default"
                  />
                  <p className="text-[14px] text-neutral-normal-default">서울특별시 00구 00동</p>
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
