import { Icon, ListItemImage } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import { formatCappedNumber } from "@/utils";

const SimilarItem = () => {
  const IconList = [
    {
      name: "Eye",
      value: 99999,
      ariaLabel: "조회수",
    },
    {
      name: "Star",
      value: 1234,
      ariaLabel: "즐겨찾기",
    },
  ];

  return (
    <article className="flex flex-col items-start justify-center gap-3">
      <ListItemImage src="/test_list.JPG" alt="" size={126} />

      <div className="flex flex-col gap-[3px]">
        <p className="font-semibold text-layout-header-default">게시글 제목</p>
        <p className="block text-[14px] leading-5 text-layout-body-default">
          <span className="after:mx-1 after:content-['·']">노원구</span>
          <time dateTime="2025-09-20T10:30:00Z">30분 전</time>
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
  );
};

export default SimilarItem;
