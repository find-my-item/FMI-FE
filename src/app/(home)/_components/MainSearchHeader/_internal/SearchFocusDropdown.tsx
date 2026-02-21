import { Icon } from "@/components/common";
import { cn } from "@/utils";

const LatestList = () => {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <li
          key={index}
          className={cn(
            "flex w-full cursor-pointer items-center justify-between gap-3 border-b border-labelsVibrant-quaternary py-4 transition-colors",
            "[&:is(:hover,:focus)]:bg-fill-neutral-strong-default"
          )}
          tabIndex={0}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-[32px] w-[32px] flex-shrink-0 rounded-full bg-fill-neutral-strong-default flex-center">
              <Icon name="Clock" size={20} />
            </div>
            <p className="truncate text-body1-regular text-labelsVibrant-primary">
              최근 검색어 목록 최근 검색어 목록 최근 검색어 목록 최근 검색어 목록 최근 검색어 목록
              최근 검색어 목록 최근 검색어 목록 최근 검색어 목록
            </p>
          </div>
          <div className="flex items-center gap-[9px]">
            <time className="text-body1-regular text-labelsVibrant-primary">01.01</time>
            <button type="button" aria-label="최근 검색어 삭제">
              <Icon name="XSecond" size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const AutoCompleteList = () => {
  return (
    <ul className="border-b-[3px] border-labelsVibrant-quaternary">
      {Array.from({ length: 5 }).map((_, index) => (
        <li
          key={index}
          className={cn(
            "w-full cursor-pointer border-b border-brand-normal-disabled py-4 transition-colors",
            "[&:is(:hover,:focus)]:bg-fill-brand-subtle-default_2"
          )}
          tabIndex={0}
        >
          <div className="flex items-center gap-3">
            <div className="h-[32px] w-[32px] flex-shrink-0 rounded-full bg-fill-brand-subtle-default_2 flex-center">
              <Icon name="Search" size={20} className="text-system-success" />
            </div>
            <p className="truncate text-body1-regular text-labelsVibrant-primary">카드 지갑</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const SearchFocusDropdown = ({ focused }: { focused: boolean }) => {
  if (!focused) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 top-[77.33px] z-[9999] mx-auto max-w-[768px] bg-white px-5 py-3">
      <AutoCompleteList />
      <LatestList />
    </div>
  );
};

export default SearchFocusDropdown;
