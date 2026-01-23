import { Chip } from "@/components/common";
import { cn, formatDate } from "@/utils";
// TODO(수현): 데이터 타입 api 연결 시 변경 예정
interface MypageCommentItemProps {
  status: "admin" | "user";
  resolvedAt?: string;
  createdAt?: string;
  userNickname?: string;
  content?: string;
}

const MypageCommentItem = ({ ...props }: MypageCommentItemProps) => {
  const displayDate = props.resolvedAt || props.createdAt;
  const displayName = props.status === "admin" ? "찾아줘 관리자" : props.userNickname;

  return (
    <article
      className={cn(
        "flex flex-col gap-2 border-b border-neutral-normal-default px-5 py-9",
        props.status === "admin" && "bg-fill-neutral-strong-default"
      )}
    >
      <header className="flex gap-[14px]">
        <div className="my-2 size-[30px] rounded-full bg-slate-200" />

        <span className="flex flex-col gap-[2px]">
          <span className="flex gap-[6px]">
            {props.status === "admin" && <Chip label="관리자" type="admin" />}
            <span className="text-body1-medium text-layout-header-default">{displayName}</span>
          </span>

          {displayDate && (
            <span className="text-body2-regular text-layout-body-default">
              {formatDate(displayDate)}
            </span>
          )}
        </span>
      </header>

      <p className="text-body1-regular text-layout-header-default">{props.content}</p>
    </article>
  );
};

export default MypageCommentItem;
