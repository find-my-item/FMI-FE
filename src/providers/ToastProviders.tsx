"use client";

import { createPortal } from "react-dom";
import { useState, useCallback, useRef } from "react";
import { Toast } from "@/app/components/common";
import { ToastType } from "@/types/ToastTypes";
import { ToastContext } from "@/app/context/ToastContext";
import { AnimatePresence, motion } from "framer-motion";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const idRef = useRef(0);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = (idRef.current += 1);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="fixed top-4 right-4 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <Toast message={toast.message} type={toast.type} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};
