import { cn } from "@/utils";

const SimilarItemSkeleton = () => {
  return (
    <article className="flex w-[126px] flex-col items-start justify-center gap-3" aria-busy="true">
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

export default SimilarItemSkeleton;
