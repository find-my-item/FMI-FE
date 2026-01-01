import { Chip, Icon } from "@/components";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";
import NoticeDetailHeader from "@/app/(route)/notice/_components/NoticeDetailHeader/NoticeDetailHeader";
import NoticeChip from "@/app/(route)/notice/_components/NoticeChip/NoticeChip";
import { cn, formatNumber } from "@/utils";

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

const data = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    postId: 1,
    title: "강남역 2호선 개찰구 근처에서 에어팟(화이트) 분실",
    content:
      "12/26 오전 9시쯤 강남역 2호선 개찰구 근처에서 에어팟(2세대, 케이스 포함)을 분실했습니다. 습득하신 분 연락 부탁드립니다.",
    address: "서울특별시 강남구 강남대로 396",
    latitude: 37.4979,
    longitude: 127.0276,
    postType: "LOST",
    itemStatus: "SEARCHING",
    imageUrls: ["https://picsum.photos/400/300?random=1"],
    radius: 0.5,
    category: "ELECTRONICS",
    favoriteCount: 1,
    favoriteStatus: false,
  },
};

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
      {isBoardType ? (
        <PostDetailHeader headerData={{ imageUrls: data.result.imageUrls }} />
      ) : (
        <NoticeDetailHeader backPath={backPath} />
      )}

      <section
        className={cn("flex flex-col", isBoardType ? "gap-12 px-[20px] py-[27px]" : "px-[20px]")}
      >
        <div>
          {isBoardType ? <Chip label={label} /> : <NoticeChip label={label} />}

          <div className={isBoardType ? "mt-[14px]" : "space-y-[28px]"}>
            <div>
              <h1 className="text-[20px] font-semibold text-layout-header-default">
                {data.result.title}
              </h1>
              <time className="text-[14px] leading-[140%] text-layout-body-default">30분 전</time>
            </div>

            <p className="mt-[24px] text-body1-regular text-layout-header-default">
              {data.result.content}
            </p>

            <ul className="mt-[32px] flex gap-[20px] text-body2-medium text-layout-body-default">
              <li className="flex gap-[4px]">
                <Icon name="Star" size={20} />
                <span>즐겨찾기 {formatNumber(data.result.favoriteCount)}</span>
              </li>
              <li className="flex gap-[4px]">
                <Icon name="EyeOpen" size={20} />
                <span>조회 {formatNumber(24)}</span>
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
                  <p className="text-[14px] text-neutral-normal-default">
                    {data.result.address || "위치 정보 없음"}
                  </p>
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
