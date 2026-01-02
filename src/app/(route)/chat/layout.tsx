import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <main className="flex w-full flex-col h-base">{children}</main>;
};

export default layout;
