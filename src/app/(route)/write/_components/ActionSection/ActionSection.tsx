import { cn } from "@/utils/cn";

interface ActionSectionProps {
  disabled?: boolean;
}

const ActionSection = ({ disabled }: ActionSectionProps) => {
  return (
    <section className="border-t border-[#E4E4E4] px-5 pb-8 pt-3" aria-label="작성 완료">
      <button
        type="submit"
        className={cn(
          "glass-card w-full rounded-[12px] py-[10px] text-[16px] font-bold",
          disabled
            ? "cursor-not-allowed bg-[#98E3BD]/90 text-[#C2F1D4]"
            : "bg-[#1EB87B]/70 text-[#F6FFFC]"
        )}
      >
        작성 완료
      </button>
    </section>
  );
};

export default ActionSection;
