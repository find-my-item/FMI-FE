import { cn } from "@/utils/cn";

interface BadgeProps {
  variant: "new" | "hot";
}

const style = {
  new: "bg-[#1EB87B]",
  hot: "bg-[#FF4242]",
};

const label = {
  new: "N",
  hot: "H",
};

function Badge({ variant }: BadgeProps) {
  return (
    <div
      className={cn(
        "h-[14px] w-[14px] rounded-full text-[8px] font-semibold text-white flex-center",
        style[variant]
      )}
    >
      {label[variant]}
    </div>
  );
}

export default Badge;
