import Link from "next/link";
import { SimilarDataItem } from "@/api/fetch/post";
import { Icon, ListItemImage } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import { formatCappedNumber, formatDate } from "@/utils";

const SimilarItemsList = ({ data }: { data: SimilarDataItem[] }) => {
  return (
    <ul
      tabIndex={0}
      className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
    >
      {data.map((post) => (
        <SimilarItem key={post.postId} data={post} />
      ))}
    </ul>
  );
};

export default SimilarItemsList;

interface SimilarItemProps {
  data: SimilarDataItem;
}

const SimilarItem = ({ data }: SimilarItemProps) => {
  const { title, thumbnailImageUrl, address, favoriteStatus, createdAt, postId } = data;

  const IconList: { name: IconName; value: number; ariaLabel: string }[] = [
    {
      name: "Eye",
      value: data.viewCount,
      ariaLabel: "조회수",
    },
    {
      name: favoriteStatus ? "StarFilled" : "Star",
      value: data.favoriteCount,
      ariaLabel: "즐겨찾기",
    },
  ];

  return (
    <li className="snap-start">
      <Link href={`/list/${postId}`} className="flex flex-col items-start justify-center gap-3">
        <ListItemImage src={thumbnailImageUrl} alt="" category={data.category} size={126} />

        <div className="flex flex-col gap-[3px]">
          {/* TODO(지권): 디자인 토큰 누락 */}
          <p className="font-semibold text-layout-header-default">{title}</p>
          <p className="block text-[14px] leading-5 text-layout-body-default">
            <span className="after:mx-1 after:content-['·']">{address}</span>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {IconList.map((icon, index) => (
            <li key={index} className="flex items-center gap-1">
              <Icon name={icon.name} size={18} />
              <span className="sr-only">{icon.ariaLabel}</span>
              <span className="text-caption1-regular text-neutral-normal-placeholder">
                {formatCappedNumber(icon.value)}
              </span>
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
};
