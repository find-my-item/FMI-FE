import { create } from "zustand";

interface PermissionState {
  isFirstSignUp: boolean;
  setFirstSignUp: (value: boolean) => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  isFirstSignUp: false,
  setFirstSignUp: (value) => set({ isFirstSignUp: value }),
}));
