import { cn } from "@/utils/cn";

interface RequiredTextProps {
  className?: string;
}

const RequiredText = ({ className }: RequiredTextProps) => {
  return <span className={cn("text-flatGreen-500", className)}>*</span>;
};

export default RequiredText;
