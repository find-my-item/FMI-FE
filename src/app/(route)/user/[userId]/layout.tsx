import { ReactNode } from "react";
import { ScrollToTopButton } from "@/components/common";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <div className="fixed bottom-5 right-5">
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default layout;
