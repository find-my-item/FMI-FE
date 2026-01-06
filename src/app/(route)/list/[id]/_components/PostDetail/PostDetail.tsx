import { cn } from "@/utils";
import { LABELS } from "./LABELS";
import { PostDetailBody, PostDetailMap } from "./_internal";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";
import { NoticeDetailHeader } from "@/app/(route)/notice/_components";
import type { PostDetailData } from "@/api/fetch/post/types/PostDetailType";

interface PostDetailProps {
  type: "find" | "lost" | "notice" | "customer";
  data: PostDetailData | undefined;
}

const PostDetail = ({ type, data }: PostDetailProps) => {
  const { label, backPath } = LABELS[type];
  const isBoardType = type === "find" || type === "lost";
  console.log(data);

  if (!data) return null;

  return (
    <article className="w-full">
      {isBoardType ? (
        <PostDetailHeader
          headerData={{
            imageUrls: data.imageUrls,
            postId: data.postId.toString(),
            nickName: data.nickName,
            profileUrl: data.profileUrl,
            userPostCount: data.userPostCount,
            chatRoomCount: data.chatRoomCount,
          }}
        />
      ) : (
        <NoticeDetailHeader backPath={backPath} />
      )}

      <section className={cn("flex flex-col px-5", isBoardType && "gap-9 py-[27px]")}>
        <PostDetailBody isBoardType={isBoardType} label={type} data={data} />

        {isBoardType && (
          <PostDetailMap
            data={{
              address: data.address,
              latitude: data.latitude,
              longitude: data.longitude,
              postId: data.postId.toString(),
              radius: data.radius,
            }}
          />
        )}
      </section>
    </article>
  );
};

export default PostDetail;
