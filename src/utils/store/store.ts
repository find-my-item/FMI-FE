import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getKakaoLocalCoord2Address } from "@/api/fetch/kakao";
import { DEFAULT_LAT_LNG, DEFAULT_ADDRESS } from "@/constants";

interface MainKakaoMapStore {
  latLng: { lat: number; lng: number };
  setLatLng: (latLng: { lat: number; lng: number }) => void;
  address: string;
  clearLatLng: () => void;
}

const extractDongAddress = (address: string): string => {
  if (!address) return "";

  const segments = address.split(" ").filter(Boolean);
  const dongSegment = segments.findLast((segment) => segment.endsWith("동"));

  return dongSegment ?? "";
};

const getAddressFromLatLng = async (lat: number, lng: number): Promise<string> => {
  const data = await getKakaoLocalCoord2Address(lat, lng);
  const firstDocument = data.documents?.[0];
  const roadAddress = firstDocument?.road_address?.address_name ?? "";
  const jibunAddress = firstDocument?.address?.address_name ?? "";
  const dongAddress = extractDongAddress(jibunAddress) || extractDongAddress(roadAddress);

  return dongAddress || roadAddress || jibunAddress || "";
};

export const useMainKakaoMapStore = create<MainKakaoMapStore>()(
  persist(
    (set) => ({
      latLng: DEFAULT_LAT_LNG,
      address: DEFAULT_ADDRESS,
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
    }),
    {
      name: "main-kakao-map-store",
    }
  )
);
