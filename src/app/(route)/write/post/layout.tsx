import { ReactNode } from "react";
import { PostWriteFormProvider } from "./location/_components";

const Layout = ({ children }: { children: ReactNode }) => {
  return <PostWriteFormProvider>{children}</PostWriteFormProvider>;
};

export default Layout;
