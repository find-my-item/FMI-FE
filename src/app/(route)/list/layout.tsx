import { ReactNode } from "react";
import { PostWriteMenu } from "./_components";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <PostWriteMenu />
    </>
  );
};

export default layout;
