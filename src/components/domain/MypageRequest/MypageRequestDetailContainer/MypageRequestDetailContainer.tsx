import { Chip } from "@/components/common";
import MypageRequestDetailComment from "../MypageCommentItem/MypageCommentItem";
import { MOCK_MYPAGE_REQUEST_COMMENTS } from "@/mock/MOCK_DATA";

const MypageRequestDetailContainer = () => {
  return (
    <div className="w-full h-base">
      <div className="border-b-flat-gray-50 w-full border-b px-5 py-[30px]">
        <Chip label="접수" type="pending" />
        <h2 className="mt-[14px] text-h2-medium">실제 분실물/습득물이 아닌 내용이에요.</h2>
        <span className="mt-1 text-body2-regular text-layout-body-default">2026.01.19</span>
        <p className="mt-6 text-body1-regular text-layout-header-default">
          여기에 신고 내용이 표기됩니다.
        </p>
      </div>

      <ul>
        {MOCK_MYPAGE_REQUEST_COMMENTS.map((item) => (
          <li key={item.commentId}>
            <MypageRequestDetailComment key={item.commentId} {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MypageRequestDetailContainer;
