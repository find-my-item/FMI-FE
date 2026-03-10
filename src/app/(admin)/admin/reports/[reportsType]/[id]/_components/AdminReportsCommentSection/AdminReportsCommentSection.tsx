import { InquiryComments } from "@/api/fetch/admin";
import { ReadOnlyCommentItem } from "@/components/domain";
import { ReadOnlyCommentItemProps } from "@/types";

interface AdminReportsCommentSectionProps {
  comments?: InquiryComments[];
}

const AdminReportsCommentSection = ({ comments }: AdminReportsCommentSectionProps) => {
  if (!comments) return null;

  // TODO(지권): 신고 댓글 추가 후 확인 필요
  const commentItemVM = (item: InquiryComments): ReadOnlyCommentItemProps => {
    return {
      isAdmin: false,
      userImageUrl: "",
      userName: item.authorName,
      content: item.content,
      createdAt: item.createdAt,
    };
  };

  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="sr-only">
        댓글
      </h2>

      <ul>
        {comments.map((data, index) => (
          <ReadOnlyCommentItem key={index} data={commentItemVM(data)} />
        ))}
      </ul>
    </section>
  );
};

export default AdminReportsCommentSection;
