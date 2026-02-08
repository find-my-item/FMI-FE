"use client";

import { ReactNode } from "react";
import { useChatSocket } from "@/api/fetch/chatRoom";

const Layout = ({ children }: { children: ReactNode }) => {
  useChatSocket({ manageConnection: true });
  return <>{children}</>;
};

export default Layout;
