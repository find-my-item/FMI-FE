import { cn } from "@/utils";
import type { PostDetailData } from "@/api/fetch/post/types/PostDetailType";
import { PostDetailBody, PostDetailPreviewKakaoMap } from "./_internal";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";

interface PostDetailProps {
  type: "find" | "lost";
  data: PostDetailData;
}

const PostDetail = ({ type, data }: PostDetailProps) => {
  const isBoardType = type === "find" || type === "lost";

  if (!data) return null;

  const headerData = {
    id: String(data.id),
    userData: data.postUserInformation,
    isMine: data.isMine,
    imageResponseList: data.imageResponseList,
  };

  const mapData = {
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    postId: String(data.id),
    radius: data.radius,
  };

  return (
    <article className="w-full">
      <PostDetailHeader headerData={headerData} />

      <section className={cn("flex flex-col px-5", isBoardType && "gap-9 py-[27px]")}>
        <PostDetailBody isBoardType={isBoardType} label={type} data={data} />

        {isBoardType && <PostDetailPreviewKakaoMap data={mapData} />}
      </section>
    </article>
  );
};

export default PostDetail;
