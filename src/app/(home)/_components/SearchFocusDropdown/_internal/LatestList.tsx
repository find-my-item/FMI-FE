import { Icon } from "@/components/common";
import { cn } from "@/utils";

const LatestList = () => {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index}>
          <div
            tabIndex={0}
            aria-label="최근 검색어 클릭"
            className={cn(
              "flex w-full cursor-pointer items-center justify-between gap-3 border-b border-labelsVibrant-quaternary py-4 transition-colors",
              "[&:is(:hover,:focus)]:bg-fill-neutral-strong-default"
            )}
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
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LatestList;
