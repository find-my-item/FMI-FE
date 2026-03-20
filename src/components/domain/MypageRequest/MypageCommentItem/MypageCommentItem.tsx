import { Chip, ProfileAvatar } from "@/components/common";
import { cn, formatDate } from "@/utils";
import Image from "next/image";
// TODO(수현): 데이터 타입 api 연결 시 작업 시 type 폴더로 분리 예정입니다. 현재는 api가 없기에 api 폴더에 옮기지 않았습니다.
interface MypageCommentItemType {
  role: "admin" | "user";
  content?: string;
  nickname?: string;
  createdAt?: string;
  profileImg?: string;
  answerImageList?: string[];
  resolvedAt?: string;
}

interface MypageCommentItemProps {
  data: MypageCommentItemType;
}

const MypageCommentItem = ({ data }: MypageCommentItemProps) => {
  const { role, content, nickname, createdAt, profileImg, answerImageList, resolvedAt } = data;
  const displayDate = resolvedAt || createdAt;

  return (
    <article
      className={cn(
        "flex flex-col gap-2 border-b border-neutral-normal-default px-5 py-9",
        role === "admin" && "bg-fill-neutral-strong-default"
      )}
    >
      <header className="flex gap-[14px]">
        <ProfileAvatar src={profileImg} size={30} />

        <span className="flex flex-col gap-[2px]">
          <span className="flex gap-[6px]">
            {role === "admin" && <Chip label="관리자" type="admin" />}
            <span className="text-body1-medium text-layout-header-default">{nickname}</span>
          </span>

          {displayDate && (
            <time dateTime={displayDate} className="text-body2-regular text-layout-body-default">
              {formatDate(displayDate)}
            </time>
          )}
        </span>
      </header>

      <p className="text-body1-regular text-layout-header-default">{content}</p>
      {answerImageList && answerImageList.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {answerImageList.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-square w-[100px] overflow-hidden rounded-lg border border-divider-default"
            >
              <Image
                src={src}
                alt={`첨부 이미지 ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default MypageCommentItem;
