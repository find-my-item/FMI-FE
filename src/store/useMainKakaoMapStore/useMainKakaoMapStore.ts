import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_LAT_LNG, DEFAULT_ADDRESS } from "@/constants";
import { getAddressFromLatLng } from "./getAddressFromLatLng";

interface MainKakaoMapStore {
  latLng: { lat: number; lng: number };
  setLatLng: (latLng: { lat: number; lng: number }) => void;
  address: string;
  clearLatLng: () => void;
  levelResetSignal: number;
  triggerLevelReset: () => void;
}

export const useMainKakaoMapStore = create<MainKakaoMapStore>()(
  persist(
    (set) => ({
      latLng: DEFAULT_LAT_LNG,
      address: DEFAULT_ADDRESS,
      levelResetSignal: 0,
      setLatLng: (latLng) => {
        set({ latLng });

        void (async () => {
          try {
            const address = await getAddressFromLatLng(latLng.lat, latLng.lng);
            set({ address });
          } catch {
            set({ address: "" });
          }
        })();
      },
      clearLatLng: () =>
        set({
          latLng: DEFAULT_LAT_LNG,
          address: DEFAULT_ADDRESS,
        }),
      triggerLevelReset: () =>
        set((state) => ({
          levelResetSignal: state.levelResetSignal + 1,
        })),
    }),
    {
      name: "main-kakao-map-store",
    }
  )
);
