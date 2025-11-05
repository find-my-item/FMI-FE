import { cn } from "@/utils";

interface RequiredTextProps {
  className?: string;
}

const RequiredText = ({ className }: RequiredTextProps) => {
  return <span className={cn("text-flatGreen-500", className)}>*</span>;
};

export default RequiredText;
