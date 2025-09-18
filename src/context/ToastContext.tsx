"use client";

import { createContext, useContext } from "react";
import { ToastType } from "@/types/ToastTypes";

type ToastContextType = {
  addToast: (message: string, type: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast 훅은 반드시 ToastProvider 안에서 사용해야 합니다.");
  }
  return context;
};
