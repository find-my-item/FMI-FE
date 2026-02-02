import { cn } from "@/utils";
import { ReactNode } from "react";

interface BaseStateLayoutProps {
  children: ReactNode;
  className?: string;
}

const BaseStateLayout = ({ children, className }: BaseStateLayoutProps) => {
  return (
    <section className={cn("h-full w-full gap-5 py-20 flex-col-center", className)}>
      {children}
    </section>
  );
};

export default BaseStateLayout;
