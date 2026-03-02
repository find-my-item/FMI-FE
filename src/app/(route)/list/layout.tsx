"use client";

import { ReactNode } from "react";
import { PostWriteMenu } from "./_components";
import { SnackBar } from "@/components/common";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-base">
      {children}
      <PostWriteMenu />
      <SnackBar
        message="유저를 차단했어요"
        actionLabel="차단 목록으로 이동"
        actionHandler={() => {}}
      />
    </div>
  );
};

export default layout;
