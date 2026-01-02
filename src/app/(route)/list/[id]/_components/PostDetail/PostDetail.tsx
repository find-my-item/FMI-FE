import { cn } from "@/utils";
import { PostDetailBody, PostDetailMap } from "./_internal";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";
import NoticeDetailHeader from "@/app/(route)/notice/_components/NoticeDetailHeader/NoticeDetailHeader";
import { MOCK_POST_DEFAULT_DETAIL } from "@/mock/MOCK_DATA";
import { LABELS } from "./LABELS";
import { GetPostDetailResponse } from "@/api/fetch/post";

interface PostDetailProps {
  type: "find" | "lost" | "notice" | "customer";
  item: {
    id: number;
    title: string;
    body: string;
    comments?: {
      id: number;
      author: string;
      date: string;
      content: string;
      replyTo?: string;
    }[];
  };
}

// TODO(지권): 실제 API 호출로 대체 예정
const data = MOCK_POST_DEFAULT_DETAIL as GetPostDetailResponse;

const PostDetail = ({ type, item }: PostDetailProps) => {
  const { label, backPath } = LABELS[type];
  const isBoardType = type === "find" || type === "lost";

  return (
    <article className="w-full">
      {isBoardType ? (
        <PostDetailHeader
          headerData={{ imageUrls: data.result.imageUrls, postId: data.result.postId.toString() }}
        />
      ) : (
        <NoticeDetailHeader backPath={backPath} />
      )}

      <section className={cn("flex flex-col px-5", isBoardType && "gap-9 py-[27px]")}>
        <PostDetailBody isBoardType={isBoardType} label={type} data={data.result} />

        {isBoardType && (
          <PostDetailMap
            data={{
              address: data.result.address,
              latitude: data.result.latitude.toString(),
              longitude: data.result.longitude.toString(),
            }}
          />
        )}
      </section>
    </article>
  );
};

export default PostDetail;
