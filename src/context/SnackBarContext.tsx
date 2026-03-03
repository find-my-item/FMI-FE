"use client";

import { createContext, useContext } from "react";

type SnackBarContextType = {
  showSnackBar: (message: string, actionLabel?: string, actionHandler?: () => void) => void;
};

export const SnackBarContext = createContext<SnackBarContextType | undefined>(undefined);

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error("useSnackBar 훅은 반드시 SnackBarProvider 안에서 사용해야 합니다.");
  }
  return context;
};
