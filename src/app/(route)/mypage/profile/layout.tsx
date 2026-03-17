import { ReactNode } from "react";
import { DetailHeader } from "@/components/layout";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DetailHeader title="프로필 설정" />
      <h1 className="sr-only">프로필 수정</h1>

      {children}
    </>
  );
};

export default layout;
