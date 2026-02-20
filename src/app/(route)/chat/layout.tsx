import { ReactNode } from "react";
import { ChatLayoutClient } from "./_components";

const Layout = ({ children }: { children: ReactNode }) => {
  return <ChatLayoutClient>{children}</ChatLayoutClient>;
};

export default Layout;
