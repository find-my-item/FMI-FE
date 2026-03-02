import { ReactNode } from "react";
import { PostWriteMenu } from "./_components";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-base">
      {children}
      <PostWriteMenu />
    </div>
  );
};

export default layout;
