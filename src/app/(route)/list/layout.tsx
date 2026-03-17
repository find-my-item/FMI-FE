import type { ReactNode } from "react";
import { PostWriteMenu } from "./_components";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
      <PostWriteMenu />
    </>
  );
};

export default Layout;
