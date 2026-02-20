import { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback="">{children}</Suspense>;
};

export default layout;
