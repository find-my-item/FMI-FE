import { create } from "zustand";

type WriteFlowProps = {
  tempModalShown: boolean;
  setTempModalShown: (v: boolean) => void;
  showManualPopup: boolean;
  setShowManualPopup: (v: boolean) => void;
  resetWriteFlow: () => void;
};

export const useWriteFlowStore = create<WriteFlowProps>((set) => ({
  tempModalShown: false,
  setTempModalShown: (v) => set({ tempModalShown: v }),
  showManualPopup: false,
  setShowManualPopup: (v) => set({ showManualPopup: v }),
  resetWriteFlow: () => set({ tempModalShown: false }),
}));
