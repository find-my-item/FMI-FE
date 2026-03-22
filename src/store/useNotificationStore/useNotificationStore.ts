import { create } from "zustand";
import type { NotificationType } from "@/api/fetch/notification";

/**
 * 알림 관련 전역 상태(미확인 여부/미확인 알림 타입 집합) 스토어입니다.
 *
 * @author hyungjun
 * @description
 * - `hasUnreadNotification`은 미확인 알림이 1개라도 있는지 나타냅니다.
 * - `unreadNotificationTypes`는 미확인 알림 타입을 중복 없이 관리합니다.
 * - SSE 이벤트 수신 시 `addUnreadNotificationType`로 즉시 반영합니다.
 * - 알림 목록 조회 결과를 기준으로 `setUnreadNotificationTypes`로 서버 상태와 재동기화합니다.
 * - 로그아웃 시 `resetUnreadNotificationState`로 관련 상태를 모두 초기화합니다.
 *
 * @example
 * ```ts
 * const { hasUnreadNotification, unreadNotificationTypes, addUnreadNotificationType } =
 *   useNotificationStore();
 * addUnreadNotificationType("CHAT");
 * ```
 */

interface NotificationStore {
  hasUnreadNotification: boolean;
  unreadNotificationTypes: NotificationType[];
  setHasUnreadNotification: (hasUnreadNotification: boolean) => void;
  addUnreadNotificationType: (type: NotificationType) => void;
  setUnreadNotificationTypes: (types: NotificationType[]) => void;
  resetUnreadNotificationState: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasUnreadNotification: false,
  unreadNotificationTypes: [],
  setHasUnreadNotification: (hasUnreadNotification) => set({ hasUnreadNotification }),
  addUnreadNotificationType: (type) =>
    set((state) => {
      if (state.unreadNotificationTypes.includes(type)) {
        return state;
      }
      return {
        unreadNotificationTypes: [...state.unreadNotificationTypes, type],
      };
    }),
  setUnreadNotificationTypes: (types) => set({ unreadNotificationTypes: types }),
  resetUnreadNotificationState: () =>
    set({
      hasUnreadNotification: false,
      unreadNotificationTypes: [],
    }),
}));
