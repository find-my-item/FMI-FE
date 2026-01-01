import { cn } from "@/utils";
import { PostDetailBody, PostDetailMap } from "./_internal";
import PostDetailHeader from "../PostDetailHeader/PostDetailHeader";
import NoticeDetailHeader from "@/app/(route)/notice/_components/NoticeDetailHeader/NoticeDetailHeader";

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

const data = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    postId: 1,
    title: "강남역 2호선 개찰구 근처에서 에어팟(화이트) 분실",
    content:
      "12/26 오전 9시쯤 강남역 2호선 개찰구 근처에서 에어팟(2세대, 케이스 포함)을 분실했습니다. 습득하신 분 연락 부탁드립니다.",
    address: "서울특별시 강남구 강남대로 396",
    latitude: 37.4979,
    longitude: 127.0276,
    postType: "LOST",
    itemStatus: "SEARCHING",
    imageUrls: ["https://picsum.photos/400/300?random=1"],
    radius: 0.5,
    category: "ELECTRONICS",
    favoriteCount: 1,
    favoriteStatus: false,
  },
};

const LABELS = {
  find: { label: "습득", backPath: "/find" },
  lost: { label: "분실", backPath: "/lost" },
  notice: { label: "공지사항", backPath: "/notice?tab=notice" },
  customer: { label: "문의내역", backPath: "/notice?tab=customer" },
} as const;

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
        <PostDetailBody isBoardType={isBoardType} label={label} data={data.result} />

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
