import { ProfileAvatar } from "@/components/common";
import { cn, formatDate } from "@/utils";
import { MOCK_COMMENT_DATA } from "@/mock/data";

const AdminReportsCommentSection = () => {
  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="sr-only">
        댓글
      </h2>

      <ul>
        {MOCK_COMMENT_DATA.map((data, index) => (
          <CommentItem key={index} data={data} />
        ))}
      </ul>
    </section>
  );
};

export default AdminReportsCommentSection;

interface CommentItemData {
  isAdmin: boolean;
  userImageUrl: string;
  userName: string;
  content: string;
  createdAt: string;
}

const CommentItem = ({ data }: { data: CommentItemData }) => {
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
