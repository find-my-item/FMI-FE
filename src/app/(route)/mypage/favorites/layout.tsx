import { ReactNode, Suspense } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback="">{children}</Suspense>;
};

export default layout;
