"use client";

import { createPortal } from "react-dom";
import { useState, useCallback, useEffect, useRef } from "react";
import { SnackBarContext } from "@/context/SnackBarContext";
import SnackBar from "@/components/common/SnackBar/SnackBar";
import { AnimatePresence, motion } from "framer-motion";

export const SnackBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackBar, setSnackBar] = useState<{
    id: number;
    message: string;
    actionLabel?: string;
    actionHandler?: () => void;
  } | null>(null);

  const [mounted, setMounted] = useState(false);
  const idRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => setMounted(true), []);

  const showSnackBar = useCallback(
    (message: string, actionLabel?: string, actionHandler?: () => void) => {
      const id = (idRef.current += 1);
      setSnackBar({ id, message, actionLabel, actionHandler });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSnackBar(null);
      }, 3000);
    },
    []
  );

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed z-[9999]">
            <AnimatePresence>
              {snackBar && (
                <motion.div
                  key={snackBar.id}
                  className="pointer-events-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SnackBar
                    message={snackBar.message}
                    actionLabel={snackBar.actionLabel}
                    actionHandler={() => {
                      if (snackBar.actionHandler) snackBar.actionHandler();
                      setSnackBar(null);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </SnackBarContext.Provider>
  );
};
