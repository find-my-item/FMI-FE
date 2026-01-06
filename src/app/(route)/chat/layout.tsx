import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full flex-col h-base">{children}</div>;
};

export default layout;
