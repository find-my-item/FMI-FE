import { cn, formatDate } from "@/utils";
import { ProfileAvatar } from "@/components/common";

/**
 * @author jikwon
 *
 * @description
 * 읽기 전용 댓글 아이템입니다.
 * 좋아요, 신고, 삭제 등 액션 버튼이 없습니다.
 * 관리자, 마이페이지 등 댓글 목록에서 사용됩니다.
 *
 * @example
 * ```tsx
 * <ReadOnlyCommentItem data={data} />
 * ```
 *
 */

interface ReadOnlyCommentItemProps {
  isAdmin: boolean;
  userImageUrl: string;
  userName: string;
  content: string;
  createdAt: string;
}

const ReadOnlyCommentItem = ({ data }: { data: ReadOnlyCommentItemProps }) => {
  const { isAdmin, userImageUrl, userName, content, createdAt } = data;

  return (
    <li className="after:block after:border-b after:border-flatGray-50 after:content-['']">
      <article
        className={cn(
          "flex flex-col gap-2 px-5 py-9",
          isAdmin ? "bg-fill-neutral-strong-default" : "bg-white"
        )}
      >
        <div className="flex items-center gap-[14px]">
          <ProfileAvatar src={userImageUrl} alt={userName} size={30} />
          <div className="flex flex-col gap-[2px]">
            <p className="text-body1-medium text-layout-header-default">{userName}</p>
            <time dateTime={createdAt} className="text-body2-regular text-layout-body-default">
              {formatDate(createdAt)}
            </time>
          </div>
        </div>
        <p className="text-body1-regular text-layout-header-default">{content}</p>
      </article>
    </li>
  );
};

export default ReadOnlyCommentItem;
