import { Icon } from "@/components/common";
import { cn } from "@/utils";

const AutoCompleteList = () => {
  return (
    <ul className="border-b-[3px] border-labelsVibrant-quaternary">
      {Array.from({ length: 5 }).map((_, index, array) => (
        <li key={index}>
          <button
            type="button"
            aria-label="자동완성 검색어 클릭"
            className={cn(
              "w-full cursor-pointer border-b border-labelsVibrant-quaternary py-4 transition-colors",
              "[&:is(:hover,:focus)]:bg-fill-brand-subtle-default_2",
              index !== array.length - 1 && "hover:border-brand-normal-disabled"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="h-[32px] w-[32px] flex-shrink-0 rounded-full bg-fill-brand-subtle-default_2 flex-center">
                {/* TODO(형준): svg 색상 변경 필요 */}
                <Icon name="Search" size={20} className="text-system-success" />
              </div>
              <p className="truncate text-body1-regular text-labelsVibrant-primary">
                카드 지갑 카드 지갑 카드 지갑 카드 지갑 카드 지갑 카드 지갑 카드 지갑 카드 지갑 카드
                지갑 카드 지갑 카드 지갑
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AutoCompleteList;
