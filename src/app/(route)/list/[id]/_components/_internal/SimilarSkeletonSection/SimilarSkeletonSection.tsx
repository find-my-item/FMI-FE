import { cn } from "@/utils";

const SimilarSkeletonSection = () => {
  return (
    <div className="hide-scrollbar flex flex-nowrap gap-4 overflow-x-auto scroll-smooth">
      {Array.from({ length: 5 }).map((_, index) => (
        <SimilarItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default SimilarSkeletonSection;

const SimilarItemSkeleton = () => {
  return (
    <article
      className="flex w-[126px] shrink-0 flex-col items-start justify-center gap-3"
      aria-busy="true"
    >
      {/* Image */}
      <div
        className={cn(
          "h-[126px] w-full rounded-[6px]",
          "skeleton-shimmer bg-labelsVibrant-quaternary"
        )}
      />

      {/* Title + Meta */}
      <div className="flex w-full flex-col gap-[6px]">
        <div
          className={cn("h-3 w-full rounded-full", "skeleton-shimmer bg-labelsVibrant-quaternary")}
        />
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-3 w-full rounded-full",
              "skeleton-shimmer bg-labelsVibrant-quaternary"
            )}
          />
        </div>
      </div>

      {/* Icons */}
      <ul className="flex w-full items-center gap-2" aria-hidden="true">
        <li className="flex w-full items-center gap-1">
          <div
            className={cn("size-4 rounded-full", "skeleton-shimmer bg-labelsVibrant-quaternary")}
          />
          <div
            className={cn(
              "h-3 flex-1 rounded-full",
              "skeleton-shimmer bg-labelsVibrant-quaternary"
            )}
          />
        </li>
        <li className="flex w-full items-center gap-1">
          <div
            className={cn("size-4 rounded-full", "skeleton-shimmer bg-labelsVibrant-quaternary")}
          />
          <div
            className={cn(
              "h-3 flex-1 rounded-full",
              "skeleton-shimmer bg-labelsVibrant-quaternary"
            )}
          />
        </li>
      </ul>
    </article>
  );
};
