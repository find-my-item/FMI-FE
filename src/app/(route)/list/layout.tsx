import { ReactNode } from "react";
import { PostWriteMenu } from "./_components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `한 물건 리스트`,
  description: `물건을 한눈에 확인해 보세요! 우리 동네 분실물들이 이곳에 모여 있어요.`,
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <PostWriteMenu />
    </>
  );
};

export default layout;
