import { MOCK_MYPAGE_COMMENTS_ITEM } from "@/mock/MOCK_DATA";
import { CommentCard, MypageEmptyUI } from "@/components/domain";

const MypageCommentsList = () => {
  return (
    <section>
      <h2 className="sr-only">댓글 목록 영역</h2>

      {MOCK_MYPAGE_COMMENTS_ITEM.length === 0 ? (
        <MypageEmptyUI pageType="comments" />
      ) : (
        <ul>
          {MOCK_MYPAGE_COMMENTS_ITEM.map((item) => (
            <CommentCard key={item.commentId} data={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MypageCommentsList;
