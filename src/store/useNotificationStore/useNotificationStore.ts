import { create } from "zustand";

interface NotificationStore {
  hasUnreadNotification: boolean;
  setHasUnreadNotification: (hasUnreadNotification: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasUnreadNotification: false,
  setHasUnreadNotification: (hasUnreadNotification) => set({ hasUnreadNotification }),
}));
