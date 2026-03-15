import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description:
    "비밀번호를 잃어버리셨나요? 이메일 인증을 통해 비밀번호를 재설정하고 찾아줘 계정에 다시 로그인하세요.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
