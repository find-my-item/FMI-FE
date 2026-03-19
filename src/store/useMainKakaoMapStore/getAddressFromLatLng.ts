import { getKakaoLocalCoord2Address } from "@/api/fetch/kakao";

const extractDongAddress = (address: string): string => {
  if (!address) return "";

  const segments = address.split(" ").filter(Boolean);
  const dongSegment = segments.findLast((segment) => segment.endsWith("동"));

  return dongSegment ?? "";
};

export const getAddressFromLatLng = async (lat: number, lng: number): Promise<string> => {
  const data = await getKakaoLocalCoord2Address(lat, lng);
  const firstDocument = data.documents?.[0];
  const roadAddress = firstDocument?.road_address?.address_name ?? "";
  const jibunAddress = firstDocument?.address?.address_name ?? "";
  const dongAddress = extractDongAddress(jibunAddress) || extractDongAddress(roadAddress);

  return dongAddress || roadAddress || jibunAddress || "";
};
