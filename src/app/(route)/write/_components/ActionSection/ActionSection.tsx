import { cn } from "@/utils";

interface ActionSectionProps {
  disabled: boolean;
}

const ActionSection = ({ disabled }: ActionSectionProps) => {
  return (
    <section className="border-t border-flatGray-50 px-5 pb-8 pt-3" aria-label="작성 완료">
      <button
        type="submit"
        className={cn(
          "glass-card w-full rounded-[12px] py-[10px] text-body1-semibold",
          disabled
            ? "cursor-not-allowed text-brand-normal-disabled bg-fill-brand-normal-disabled"
            : "text-brand-normal-default bg-fill-brand-normal-default"
        )}
      >
        작성 완료
      </button>
    </section>
  );
};

export default ActionSection;
