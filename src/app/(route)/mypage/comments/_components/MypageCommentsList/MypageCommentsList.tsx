import { Icon } from "@/components/common";
import Image from "next/image";

// TODO(수현): 임시 데이터, api 연결 시 삭제 예정
const MockData: any[] = [
  {
    commentId: 1,
    comment: "댓글 내용",
    mentionUser: "감자",
    date: "2026.01.15",
    like: 34,
  },
  {
    commentId: 2,
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    date: "2026.01.15",
    like: 34,
  },
  {
    commentId: 3,
    // comment: "댓글 내용",
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    date: "2026.01.15",
    like: 34,
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
  },
];

const MypageCommentsEmptyUI = () => {
  return (
    <div className="flex gap-5 py-20 flex-col-center">
      <Icon name="NoComments" size={70} />
      <h2 className="text-h2-bold text-layout-header-default">아직 작성한 댓글이 없어요</h2>
      <p className="text-body2-regular text-layout-body-default">
        아직 작성한 댓글이 없습니다. <br />
        게시글에 댓글을 남겨 보세요!
      </p>
    </div>
  );
};

const MypageCommentsList = () => {
  return (
    <section>
      <h2 className="sr-only">댓글 목록 영역</h2>
      <ul>
        {MockData.map((item) => (
          <li
            key={item.commentId}
            className="flex w-full justify-between border-b border-divider-default px-5 py-[30px]"
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="w-full truncate">
                {item.mentionUser && (
                  <span className="mr-1 text-brand-normal-default"> @{item.mentionUser}</span>
                )}
                {item.comment}
              </p>

              <span className="mt-1 text-body2-regular text-layout-body-default">{item.date}</span>
              <span className="mt-2 flex text-body2-regular text-neutral-strong-placeholder">
                <Icon name="Star" size={16} />
                {item.like}
              </span>
            </div>

            {item.thumbnailUrl && (
              <Image
                src={item.thumbnailUrl}
                alt=""
                width={90}
                height={90}
                className="ml-1 object-cover"
              />
            )}
          </li>
        ))}
      </ul>
      {MockData.length === 0 && <MypageCommentsEmptyUI />}
    </section>
  );
};

export default MypageCommentsList;
