import { Chip } from "@/components/common";
import { cn } from "@/utils";

// TODO(수현): 데이터 타입 api 연결 시 변경 예정
interface DetailCommentsProps {
  status: "admin" | "user";
  resolvedAt?: string;
  createdAt?: string;
  userNickname?: string;
  content?: string;
}

const MyReportsDetailComments = ({
  status,
  resolvedAt,
  createdAt,
  userNickname,
  content,
}: DetailCommentsProps) => {
  const displayDate = resolvedAt || createdAt;
  const displayName = status === "admin" ? "찾아줘 관리자" : userNickname;

  return (
    <article
      className={cn(
        "flex flex-col gap-2 border-b border-neutral-normal-default px-5 py-9",
        status === "admin" && "bg-fill-neutral-strong-default"
      )}
    >
      <header className="flex gap-[14px]">
        <div className="my-2 size-[30px] rounded-full bg-slate-200" />

        <span className="flex flex-col gap-[2px]">
          <span className="flex gap-[6px]">
            {status === "admin" && <Chip label="관리자" type="admin" />}
            <h3 className="text-body1-medium text-layout-header-default">{displayName}</h3>
          </span>

          <span className="text-body2-regular text-layout-body-default">
            {displayDate ? displayDate.split("T")[0].replace(/-/g, ".") : ""}
          </span>
        </span>
      </header>

      <p className="text-body1-regular text-layout-header-default">{content}</p>
    </article>
  );
};

export default MyReportsDetailComments;
