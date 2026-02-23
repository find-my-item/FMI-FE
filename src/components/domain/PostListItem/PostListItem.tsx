import Link from "next/link";
import { PostItem } from "@/api/fetch/post";
import { Badge, Chip, Icon, ListItemImage } from "@/components/common";
import { formatDate, getItemCategoryLabel, getItemStatusLabel, highlightText } from "@/utils";

interface PostListItemProps {
  post: PostItem | any; // TODO(지권): 각 페이지에 맞는 타입 추가해주세요
  linkState?: "notice" | "list";
  keyword?: string;
}

const PostListItem = ({ post, linkState = "list", keyword }: PostListItemProps) => {
  const { id, postStatus, category, createdAt, isNew, isHot, imageCount } = post;

  const VIEW_ITEM = [
    {
      icon: "Star",
      count: post.favoriteCount,
      iconColor: "text-labelsVibrant-quaternary",
    },
    {
      icon: "Eye",
      count: post.viewCount,
      iconColor: "text-labelsVibrant-quaternary",
    },
  ] as const;

  return (
    <li>
      <Link
        href={linkState === "list" ? `/list/${id}` : `/notice/${id}`}
        className="flex w-full items-center gap-[14px] border-b border-b-flatGray-50 px-5 py-[30px] transition-colors hover:bg-flatGray-25"
      >
        <div className="min-w-0 flex-1">
          {linkState === "list" && (
            <div className="mb-2 flex gap-2">
              <Chip label={getItemStatusLabel(postStatus)} type="brandSubtle" />
              <Chip label={getItemCategoryLabel(category)} type="neutralStrong" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="w-full">
              <div className="flex items-center gap-1">
                {isNew && <Badge variant="new" />}
                {isHot && <Badge variant="hot" />}
                <h2 className="flex-1 text-h3-semibold text-layout-header-default u-ellipsis">
                  {keyword ? highlightText(post.title, keyword) : post.title}
                </h2>
              </div>
              <span className="text-body2-regular text-layout-body-default">
                <span className="after:inline-block after:px-1 after:content-['·']">
                  {post.address || "위치 정보가 이상해요."}
                </span>
                <time dateTime={createdAt}>{formatDate(createdAt)}</time>
              </span>
            </div>
            <p className="w-full text-body2-medium text-neutral-normal-default u-ellipsis">
              {keyword ? highlightText(post.summary, keyword) : post.summary}
            </p>
          </div>
          <div className="mt-2 flex gap-2">
            {VIEW_ITEM.map((item) => (
              <span
                key={item.icon}
                className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder"
              >
                <Icon name={item.icon} size={16} className={item.iconColor} />
                {item.count}
              </span>
            ))}
          </div>
        </div>

        <ListItemImage
          src={post.thumbnailImageUrl}
          alt="게시글 대표 이미지"
          size={90}
          category={category}
          imageCount={imageCount}
        />
      </Link>
    </li>
  );
};

export default PostListItem;
