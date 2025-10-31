import Icon, { IconName } from "@/components/Icon/Icon";
import { formatNumber } from "@/utils/formatNumber";

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
    <div className="flex flex-col items-start justify-center gap-3">
      {/* TODO(지권): 추후 이미지 컴포넌트 변경 */}
      <div className="h-[126px] w-[126px] rounded-[6px] bg-[#D9D9D9]" />

      <div className="flex flex-col gap-[3px]">
        <span className="font-semibold text-[#363636]">게시글 제목</span>
        <span className="text-[14px] leading-5 text-[#787878]">노원구 · 30분 전</span>
      </div>

      <ul className="flex items-center gap-2">
        {IconList.map((icon, index) => (
          <li key={index} className="flex items-center gap-1" aria-label={`${icon.ariaLabel}`}>
            <Icon name={icon.name as IconName} size={18} aria-hidden="true" />
            <span className="text-[14px] leading-5 text-[#9D9D9D]">{formatNumber(icon.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarItem;
