import { formatNumber } from "@/utils";
import { CategoryType, ItemStatus } from "@/types";
import { Icon } from "@/components";
import { NoticeChip } from "@/app/(route)/notice/_components";
import PostChipSection from "../PostChipSection/PostChipSection";
import { LABELS } from "../../LABELS";

type BodyData = {
  title: string;
  content: string;
  favoriteCount: number;
  itemStatus: ItemStatus;
  category: CategoryType;
};

type PostDetailBodyProps = {
  isBoardType: boolean;
  label: "find" | "lost" | "notice" | "customer";
  data: BodyData;
};

const PostDetailBody = ({ isBoardType, label, data }: PostDetailBodyProps) => {
  const { title, content, favoriteCount, itemStatus, category } = data;

  return (
    <article>
      {isBoardType ? (
        <PostChipSection itemStatus={itemStatus} category={category} />
      ) : (
        <NoticeChip label={LABELS[label].label} />
      )}

      <div className={isBoardType ? "mt-[14px]" : "space-y-[28px]"}>
        <div>
          <h1 className="text-[20px] font-semibold text-layout-header-default">{title}</h1>
          <time className="text-[14px] leading-[140%] text-layout-body-default">30분 전</time>
        </div>

        <p className="mt-[24px] text-body1-regular text-layout-header-default">{content}</p>

        <ul className="mt-[32px] flex gap-[20px] text-body2-medium text-layout-body-default">
          <li className="flex gap-[4px]">
            <Icon name="Star" size={20} />
            <span>즐겨찾기 {formatNumber(favoriteCount)}</span>
          </li>
          <li className="flex gap-[4px]">
            <Icon name="EyeOpen" size={20} />
            <span>조회 {formatNumber(24)}</span>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default PostDetailBody;
