import { SimilarDataItem } from "@/api/fetch/post";
import { Icon, ListItemImage } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import { formatCappedNumber, formatDate } from "@/utils";

interface SimilarItemProps {
  data: SimilarDataItem;
}

const SimilarItem = ({ data }: SimilarItemProps) => {
  const { title, thumbnailImageUrl, address, favoriteCount, favoriteStatus, createdAt } = data;
  const IconList = [
    {
      name: "Eye",
      value: favoriteCount,
      ariaLabel: "조회수",
    },
    {
      name: "Star",
      value: favoriteCount,
      ariaLabel: "즐겨찾기",
    },
  ];

  return (
    <li className="snap-start">
      <article className="flex flex-col items-start justify-center gap-3">
        <ListItemImage src={thumbnailImageUrl} alt="" size={126} />

        <div className="flex flex-col gap-[3px]">
          <p className="font-semibold text-layout-header-default">{title}</p>
          <p className="block text-[14px] leading-5 text-layout-body-default">
            <span className="after:mx-1 after:content-['·']">{address}</span>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {IconList.map((icon, index) => (
            <li key={index} className="flex items-center gap-1">
              <Icon name={icon.name as IconName} size={18} aria-hidden="true" />
              <span className="sr-only">{icon.ariaLabel}</span>
              <span className="text-caption1-regular text-neutral-normal-placeholder">
                {formatCappedNumber(icon.value)}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
};

export default SimilarItem;
