import Image from "next/image";
import Link from "next/link";
import { Badge, Chip, Icon } from "@/components/common";
import { PostItem } from "@/api/fetch/post";
import { formatDate, getItemCategoryLabel, getItemStatusLabel } from "@/utils";

type PostListItemProps = {
  post: PostItem;
  linkState?: "notice" | "list";
};

const PostListItem = ({ post, linkState = "list" }: PostListItemProps) => {
  const { itemStatus, category, createdAt, new: isNew, hot: isHot } = post;

  const VIEW_ITEM = [
    {
      icon: "Star",
      count: post.favoriteCount,
    },
    {
      icon: "Eye",
      count: post.viewCount,
    },
  ] as const;

  return (
    <li>
      <Link
        href={linkState === "list" ? `/list/${post.postId}` : `/notice/${post.postId}`}
        className="duration-130 flex w-full cursor-pointer items-center gap-[14px] border-b border-b-flatGray-50 px-[20px] py-[30px] transition-colors hover:bg-flatGray-25"
      >
        <div className="min-w-0 flex-1">
          {linkState === "list" && (
            <div className="mb-2 flex gap-2">
              <Chip label={getItemStatusLabel(itemStatus)} type="status" />
              <Chip label={getItemCategoryLabel(category)} type="category" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="w-full">
              <div className="flex items-center gap-1">
                {isNew && <Badge variant="new" />}
                {isHot && <Badge variant="hot" />}
                <h2 className="flex-1 text-h3-semibold text-layout-header-default u-ellipsis">
                  {post.title}
                </h2>
              </div>
              <span className="text-body2-regular text-layout-body-default">
                <span className="after:inline-block after:px-1 after:content-['·']">
                  {post.address || "위치 정보가 이상해요."}
                </span>
                <time dateTime={createdAt}>{formatDate(createdAt)}</time>
              </span>
            </div>
            <p className="w-full text-body2-regular text-neutral-normal-default u-ellipsis">
              {post.summary}
            </p>
          </div>
          <div className="mt-2 flex gap-2">
            {VIEW_ITEM.map((item) => (
              <span
                key={item.icon}
                className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder"
              >
                <Icon name={item.icon} size={16} />
                {item.count}
              </span>
            ))}
          </div>
        </div>

        {post.thumbnailUrl && (
          <Image
            src={post.thumbnailUrl}
            alt="아이템 이미지"
            width={90}
            height={90}
            className="h-[90px] w-[90px] rounded-[10px]"
          />
        )}
      </Link>
    </li>
  );
};

export default PostListItem;
