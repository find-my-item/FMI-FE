import { formatNumber } from "@/utils";
import { Icon } from "@/components/common";
import { NoticeChip } from "@/app/(route)/notice/_components";
import PostChipSection from "../PostChipSection/PostChipSection";
import { LABELS } from "../../LABELS";
import { PostDetailData } from "@/api/fetch/post";

interface PostDetailBodyProps {
  isBoardType: boolean;
  label: "find" | "lost" | "notice" | "customer";
  data: PostDetailData;
}

const PostDetailBody = ({ isBoardType, label, data }: PostDetailBodyProps) => {
  const { title, content, favoriteCount, itemStatus, category, createdAt, viewCount } = data;

  return (
    <article>
      {isBoardType ? (
        <PostChipSection chipData={{ itemStatus, category }} />
      ) : (
        <NoticeChip label={LABELS[label].label} />
      )}

      <div className={isBoardType ? "mt-[14px]" : "space-y-7"}>
        <div>
          <h1 className="text-[20px] font-semibold text-layout-header-default">{title}</h1>
          <time className="text-[14px] leading-[140%] text-layout-body-default">{createdAt}</time>
        </div>

        <p className="mt-6 text-body1-regular text-layout-header-default">{content}</p>

        <ul className="mt-8 flex gap-5 text-body2-medium text-layout-body-default">
          <li className="flex gap-1">
            <Icon name="Star" size={20} />
            <span>즐겨찾기 {formatNumber(favoriteCount || 0)}</span>
          </li>
          <li className="flex gap-1">
            <Icon name="EyeOpen" size={20} />
            <span>조회 {formatNumber(viewCount || 0)}</span>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default PostDetailBody;
