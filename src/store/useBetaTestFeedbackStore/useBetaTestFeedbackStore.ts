import { create } from "zustand";

/**
 * @description
 * 베타 테스트 안내 모달 노출 여부를 관리하는 전역 스토어입니다.
 * 로컬스토리지에 저장된 'hasShownBetaTestModal' 값에 따라
 * 사용자가 최초 1회(글쓰기, 댓글작성, 채팅 등)에만 모달을 볼 수 있도록 조절합니다.
 */
interface BetaTestFeedbackStore {
  isOpen: boolean;
  openBetaTestModal: () => void;
  closeBetaTestModal: () => void;
}

// TODO: 베타 테스트 종료 후 제거
export const useBetaTestFeedbackStore = create<BetaTestFeedbackStore>((set) => ({
  isOpen: false,
  openBetaTestModal: () => {
    const hasShown = localStorage.getItem("hasShownBetaTestModal");
    if (!hasShown) {
      set({ isOpen: true });
      localStorage.setItem("hasShownBetaTestModal", "true");
    }
  },
  closeBetaTestModal: () => set({ isOpen: false }),
}));
