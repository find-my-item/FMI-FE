import { ReactNode } from "react";
import { FloatingButton } from "@/components/common";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <div className="fixed bottom-5 right-5">
        <FloatingButton ariaLabel="글쓰기" />
      </div>
    </>
  );
};

export default layout;
