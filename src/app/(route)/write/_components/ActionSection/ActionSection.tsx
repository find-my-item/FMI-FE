import { cn } from "@/utils";
import { Button } from "@/components";

interface ActionSectionProps {
  disabled: boolean;
}

const ActionSection = ({ disabled }: ActionSectionProps) => {
  return (
    <section className="px-5 pb-8 pt-3">
      <Button
        type="submit"
        disabled={disabled}
        className={cn(
          "glass-card min-h-[44px] w-full rounded-[10px] py-[10px] text-body1-semibold",
          disabled
            ? "cursor-not-allowed text-brand-normal-disabled bg-fill-brand-normal-disabled"
            : "text-brand-normal-default bg-fill-brand-normal-default"
        )}
      >
        작성 완료
      </Button>
    </section>
  );
};

export default ActionSection;
