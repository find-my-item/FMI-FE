import { ReactNode } from "react";
import { WriteNoticeFloatingButton } from "./_components";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <WriteNoticeFloatingButton />
    </>
  );
};

export default layout;
