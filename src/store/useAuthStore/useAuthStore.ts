import { create } from "zustand";

interface AuthStore {
  isAuthInitialized: boolean;
  setAuthInitialized: (val: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthInitialized: false,
  setAuthInitialized: (val) => set({ isAuthInitialized: val }),
}));
