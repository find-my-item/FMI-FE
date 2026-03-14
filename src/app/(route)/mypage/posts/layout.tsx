import { LoadingState } from "@/components/state";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<LoadingState />}>{children}</Suspense>;
};

export default Layout;
