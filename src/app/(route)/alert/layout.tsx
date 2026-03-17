import { ReactNode } from "react";
import { AlertDetailHeader } from "./_components";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col h-base">
      <AlertDetailHeader />
      <h1 className="sr-only">알림 페이지</h1>
      {children}
    </div>
  );
};

export default layout;
