import { Chip } from "@/components/common";
import { cn, formatDate } from "@/utils";
// TODO(수현): 데이터 타입 api 연결 시 작업 시 type 폴더로 분리 예정입니다. 현재는 api가 없기에 api 폴더에 옮기지 않았습니다.
interface MypageCommentItemType {
  status: "admin" | "user";
  resolvedAt?: string;
  createdAt?: string;
  userNickname?: string;
  content?: string;
}

interface MypageCommentItemProps {
  data: MypageCommentItemType;
}

const MypageCommentItem = ({ data }: MypageCommentItemProps) => {
  const displayDate = data.resolvedAt || data.createdAt;
  const displayName = data.status === "admin" ? "찾아줘 관리자" : data.userNickname;

  return (
    <article
      className={cn(
        "flex flex-col gap-2 border-b border-neutral-normal-default px-5 py-9",
        data.status === "admin" && "bg-fill-neutral-strong-default"
      )}
    >
      <header className="flex gap-[14px]">
        <div className="my-2 size-[30px] rounded-full bg-slate-200" />

        <span className="flex flex-col gap-[2px]">
          <span className="flex gap-[6px]">
            {data.status === "admin" && <Chip label="관리자" type="admin" />}
            <span className="text-body1-medium text-layout-header-default">{displayName}</span>
          </span>

          {displayDate && (
            <span className="text-body2-regular text-layout-body-default">
              {formatDate(displayDate)}
            </span>
          )}
        </span>
      </header>

      <p className="text-body1-regular text-layout-header-default">{data.content}</p>
    </article>
  );
};

export default MypageCommentItem;
