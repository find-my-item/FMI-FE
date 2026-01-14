import { create } from "zustand";
import type { PostType, Radius } from "@/types";

type WriteStore = {
  lat: number | null;
  lng: number | null;
  address: string | null;
  fullAddress: string | null;
  radius: Radius | null;

  setLatLng: (lat: number | null, lng: number | null) => void;
  setAddress: (address: string | null) => void;
  setFullAddress: (fullAddress: string | null) => void;
  setRadius: (radius: Radius | null) => void;

  type: PostType;
  setType: (type: PostType) => void;

  clearLocation: () => void;
};

export const useWriteStore = create<WriteStore>((set) => ({
  lat: null,
  lng: null,
  address: null,
  fullAddress: null,
  radius: null,
  type: "LOST",

  setLatLng: (lat, lng) => set({ lat, lng }),
  setAddress: (address) => set({ address }),
  setFullAddress: (fullAddress) => set({ fullAddress }),
  setRadius: (radius) => set({ radius }),
  setType: (type) => set({ type }),
  clearLocation: () =>
    set({ lat: null, lng: null, address: null, fullAddress: null, radius: null }),
}));
