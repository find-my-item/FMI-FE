import { Icon } from "@/components";
import { IconName } from "@/components/common/Icon/Icon";
import { formatNumber } from "@/utils";

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
      {/* TODO(지권): 추후 이미지 컴포넌트 변경 */}
      <div className="h-[126px] w-[126px] rounded-[6px] bg-flatGray-100" />

      <div className="flex flex-col gap-[3px]">
        <span className="font-semibold text-layout-header-default">게시글 제목</span>
        <span className="text-[14px] leading-5 text-layout-body-default">
          노원구 · <time dateTime="2025-09-20T10:30:00Z">30분 전</time>
        </span>
      </div>

      <ul className="flex items-center gap-2">
        {IconList.map((icon, index) => (
          <li key={index} className="flex items-center gap-1">
            <Icon name={icon.name as IconName} size={18} aria-hidden="true" />
            <span className="sr-only">{icon.ariaLabel}</span>
            <span className="text-caption1-regular text-neutral-normal-placeholder">
              {formatNumber(icon.value)}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SimilarItem;
