import { cn } from "@/utils/cn";

interface ChipProps {
  label: string;
}

type ChipType = "status" | "category";

interface ChipProps {
  label: string;
  type?: ChipType;
}

const TypeMap: Record<ChipType, string> = {
  status: "bg-[#D6F8E1] text-[#1EB87B]",
  category: "bg-[#FEF4E6] text-[#FF9200]",
};

const Chip = ({ label, type = "status" }: ChipProps) => {
  return (
    <span className={cn("rounded-full px-3 py-1 text-[14px] font-semibold", TypeMap[type])}>
      {label}
    </span>
  );
};

export default Chip;
