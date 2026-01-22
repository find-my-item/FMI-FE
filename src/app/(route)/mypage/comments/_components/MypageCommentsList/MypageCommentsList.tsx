import { Icon } from "@/components/common";
import Image from "next/image";
import { MOCK_MYPAGE_COMMENTS_ITEM } from "@/mock/MOCK_DATA";
import { MypageEmptyUI } from "@/components/domain";

const MypageCommentsList = () => {
  return (
    <section>
      <h2 className="sr-only">댓글 목록 영역</h2>
      <ul>
        {MOCK_MYPAGE_COMMENTS_ITEM.map((item) => (
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
      {MOCK_MYPAGE_COMMENTS_ITEM.length === 0 && (
        <MypageEmptyUI
          IconName="NoComments"
          titleText="작성한 댓글"
          subText="게시글에 댓글을 남겨 보세요!"
        />
      )}
    </section>
  );
};

export default MypageCommentsList;
