import { ReactNode } from "react";
import { cn } from "@/utils";

interface BaseStateLayoutProps {
  children: ReactNode;
  className?: string;
}

const BaseStateLayout = ({ children, className }: BaseStateLayoutProps) => {
  return (
    <div className={cn("h-full w-full gap-5 py-20 flex-col-center", className)}>{children}</div>
  );
};

export default BaseStateLayout;
