import { create } from "zustand";
import type { Radius } from "@/types";

type WriteStore = {
  lat: number | null;
  lng: number | null;
  location: string | null;
  radius: Radius | null;

  setLatLng: (lat: number | null, lng: number | null) => void;
  setLocation: (location: string | null) => void;
  setRadius: (radius: Radius | null) => void;
};

export const useWriteStore = create<WriteStore>((set) => ({
  lat: null,
  lng: null,
  location: null,
  radius: null,

  setLatLng: (lat, lng) => set({ lat, lng }),
  setLocation: (location) => set({ location }),
  setRadius: (radius) => set({ radius }),
}));
