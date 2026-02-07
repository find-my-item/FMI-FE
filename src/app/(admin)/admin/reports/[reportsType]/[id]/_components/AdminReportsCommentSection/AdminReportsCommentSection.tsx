import { MOCK_COMMENT_DATA } from "@/mock/data";
import { ReadOnlyCommentItem } from "@/components/domain";

const AdminReportsCommentSection = () => {
  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="sr-only">
        댓글
      </h2>

      <ul>
        {MOCK_COMMENT_DATA.map((data, index) => (
          <ReadOnlyCommentItem key={index} data={data} />
        ))}
      </ul>
    </section>
  );
};

export default AdminReportsCommentSection;
