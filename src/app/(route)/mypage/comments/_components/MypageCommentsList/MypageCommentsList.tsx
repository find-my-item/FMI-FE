import { Icon } from "@/components/common";
import Image from "next/image";

// TODO(수현): 임시 데이터, api 연결 시 삭제 예정
const MockData = [
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

const MypageCommentsList = () => {
  return (
    <section>
      <h2 className="sr-only">댓글 목록 영역</h2>
      {MockData.map((item) => (
        <div
          key={item.commentId}
          className="flex w-full justify-between border-b border-divider-default px-5 py-[30px]"
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="w-full truncate">
              {item.mentionUser && (
                <span className="mr-1 text-brand-normal-default"> @{item.mentionUser}</span>
              )}
              {item.comment}
            </span>

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
        </div>
      ))}
    </section>
  );
};

export default MypageCommentsList;
