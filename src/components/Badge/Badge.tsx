import { cn } from "@/utils/cn";

interface BadgeProps {
  variant: "new" | "hot";
}

export function Badge({ variant }: BadgeProps) {
  const style = {
    new: "bg-[#1EB87B]",
    hot: "bg-[#FF4242]",
  };

  const label = {
    new: "N",
    hot: "H",
  };

  return (
    <div
      className={cn(
        "h-[14px] w-[14px] rounded-full text-[8px] text-white flex-center",
        style[variant]
      )}
    >
      {label[variant]}
    </div>
  );
}
