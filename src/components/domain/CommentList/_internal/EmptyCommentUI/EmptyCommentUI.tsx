import { Icon } from "@/components/common";

/**
 * 댓글 Empty UI
 *
 * @author jikwon
 */

const EmptyCommentUI = () => {
  return (
    <div className="gap-5 py-8 text-center flex-col-center">
      <Icon name="NoComments" size={70} />
      <p className="whitespace-pre-line text-body2-regular text-layout-body-default">
        {`아직 작성된 댓글이 없습니다.\n첫 번째 댓글을 남겨보세요!`}
      </p>
    </div>
  );
};

export default EmptyCommentUI;
