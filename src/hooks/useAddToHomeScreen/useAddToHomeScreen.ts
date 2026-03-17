"use client";

import { usePWA } from "@/providers/PWAProvider";

export const useAddToHomeScreen = () => {
  return usePWA();
};

export default useAddToHomeScreen;
