import { cn } from "@/utils/cn";

interface GlassMorphismButtonProps {
  style?: string;
  isDisabled: boolean;
  children: React.ReactNode;
}

const GlassMorphismButton = ({ style, isDisabled, children }: GlassMorphismButtonProps) => {
  return (
    <button
      className={cn(
        "glass-card h-[44px] w-[358px] rounded-[10px] text-[16px] font-semibold text-white",
        isDisabled ? "bg-[#98E3BD]/90" : "bg-[#1EB87B]/70",
        style
      )}
    >
      {children}
    </button>
  );
};

export default GlassMorphismButton;
