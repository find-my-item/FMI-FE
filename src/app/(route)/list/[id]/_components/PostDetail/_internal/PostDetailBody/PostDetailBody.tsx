import { Icon } from "@/components/common";
import { PostDetailData } from "@/api/fetch/post";
import { formatDate, formatViewCount } from "@/utils";
import { NoticeChip } from "@/app/(route)/notice/_components";
import PostChipSection from "../PostChipSection/PostChipSection";
import { LABELS } from "../../LABELS";
import { useToggleFavorite } from "../../../../_hooks/useToggleFavorite";

interface PostDetailBodyProps {
  isBoardType: boolean;
  label: "find" | "lost" | "notice" | "customer";
  data: PostDetailData;
}

const PostDetailBody = ({ isBoardType, label, data }: PostDetailBodyProps) => {
  const { title, content, favoriteCount, postStatus, category, createdAt, viewCount } = data;
  const { handleToggleFavorite, isPending } = useToggleFavorite({ postId: data.id });

  return (
    <article>
      {isBoardType ? (
        <PostChipSection chipData={{ postStatus, category }} />
      ) : (
        <NoticeChip label={LABELS[label].label} />
      )}

      <div className={isBoardType ? "mt-[14px]" : "space-y-7"}>
        <div>
          <h1 className="text-[20px] font-semibold text-layout-header-default">{title}</h1>
          <time className="text-[14px] leading-[140%] text-layout-body-default">
            {formatDate(createdAt)}
          </time>
        </div>

        <p className="mt-6 text-body1-regular text-layout-header-default">{content}</p>

        <ul className="mt-8 flex gap-5 text-body2-medium text-layout-body-default">
          <li className="flex gap-1">
            <Icon name="EyeOpen" size={20} />
            <span>조회 {formatViewCount(viewCount)}</span>
          </li>
          <li>
            <button
              type="button"
              className="flex gap-1"
              disabled={isPending}
              onClick={() => handleToggleFavorite(data.favoriteStatus)}
            >
              {/* TODO(지권): 즐겨찾기 true 상태 아이콘 추가 */}
              <Icon name="Star" size={20} />
              <span>즐겨찾기</span>
              <span>{formatViewCount(favoriteCount)}</span>
            </button>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default PostDetailBody;
