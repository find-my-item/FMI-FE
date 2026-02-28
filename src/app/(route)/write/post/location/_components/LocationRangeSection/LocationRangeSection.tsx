"use client";

import { useState } from "react";
import { Radius } from "@/types";
import { BottomSheet, PostWriteKakaoMap } from "../_internal";
import { getKakaoLocalCoord2Address } from "@/api/fetch/kakao";
import { useToast } from "@/context/ToastContext";

interface LocationRangeSectionProps {
  address: string | null;
  fullAddress: string | null;
  initialLat?: number;
  initialLng?: number;
}

const LocationRangeSection = ({
  address,
  fullAddress,
  initialLat,
  initialLng,
}: LocationRangeSectionProps) => {
  const { addToast } = useToast();

  const [radius, setRadius] = useState<Radius>(3000);

  const [currentLat, setCurrentLat] = useState(initialLat ?? 37.566370748);
  const [currentLng, setCurrentLng] = useState(initialLng ?? 126.977918341);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [currentFullAddress, setCurrentFullAddress] = useState(fullAddress);

  const handleCenterChange = async (center: { lat: number; lng: number }) => {
    setCurrentLat(center.lat);
    setCurrentLng(center.lng);

    try {
      const data = await getKakaoLocalCoord2Address(center.lat, center.lng);
      if (data.documents && data.documents.length > 0) {
        const { address: addressDoc } = data.documents[0];

        const newFullAddress =
          `${addressDoc.region_1depth_name} ${addressDoc.region_2depth_name} ${addressDoc.region_3depth_name}`.trim();

        const newAddress = addressDoc.region_3depth_name || addressDoc.region_2depth_name;

        setCurrentFullAddress(newFullAddress);
        setCurrentAddress(newAddress);
      }
    } catch {
      addToast("위치 정보를 불러오는데 실패했어요", "error");
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-350px)] w-full">
        <PostWriteKakaoMap
          lat={currentLat}
          lng={currentLng}
          radius={radius}
          onCenterChange={handleCenterChange}
        />
      </div>

      <BottomSheet
        locationInfo={{
          address: currentAddress,
          fullAddress: currentFullAddress,
          lat: currentLat,
          lng: currentLng,
        }}
        radiusState={{ radius, setRadius }}
      />
    </>
  );
};

export default LocationRangeSection;
