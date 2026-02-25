import { create } from "zustand";

type WriteFlowProps = {
  tempModalShown: boolean;
  setTempModalShown: (v: boolean) => void;
  resetWriteFlow: () => void;
};

export const useWriteFlowStore = create<WriteFlowProps>((set) => ({
  tempModalShown: false,
  setTempModalShown: (v) => set({ tempModalShown: v }),
  resetWriteFlow: () => set({ tempModalShown: false }),
}));
