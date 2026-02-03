import { cn } from "@/utils";
import { LABELS } from "./LABELS";
import { NoticeDetailHeader } from "@/app/(route)/notice/_components";
import type { PostDetailData } from "@/api/fetch/post/types/PostDetailType";
import { PostDetailBody, PostDetailPreviewKakaoMap } from "./_internal";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";

interface PostDetailProps {
  type: "find" | "lost" | "notice" | "customer";
  data: PostDetailData | undefined | any; // TODO(지권): 공지사항 타입 추가 후 any 타입 지워주세요
}

const PostDetail = ({ type, data }: PostDetailProps) => {
  const { label, backPath } = LABELS[type];
  const isBoardType = type === "find" || type === "lost";

  if (!data) return null;

  return (
    <article className="w-full">
      {isBoardType ? (
        <PostDetailHeader
          headerData={{
            ...data,
          }}
        />
      ) : (
        <NoticeDetailHeader backPath={backPath} />
      )}

      <section className={cn("flex flex-col px-5", isBoardType && "gap-9 py-[27px]")}>
        <PostDetailBody isBoardType={isBoardType} label={type} data={data} />

        {isBoardType && <PostDetailPreviewKakaoMap data={data} />}
      </section>
    </article>
  );
};

export default PostDetail;
