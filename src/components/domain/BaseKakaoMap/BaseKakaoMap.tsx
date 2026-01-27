"use client";

import { CSSProperties, ReactNode, useState } from "react";
import { Map, MapMarker, Circle, useKakaoLoader } from "react-kakao-maps-sdk";
import { MapErrorState, MapLoadingState } from "@/components/domain/BaseKakaoMap/_internal";

type LatLng = { lat: number; lng: number };

interface BaseKakaoMapProps {
  center: LatLng;

  /** map */
  level?: number;
  draggable?: boolean;
  style?: CSSProperties;

  /** marker */
  showMarker?: boolean;
  markerSize?: { width: number; height: number };
  markerOffset?: { x: number; y: number };

  /** radius */
  radius?: number;
  showCircle?: boolean;

  /** events */
  onDragEnd?: (center: LatLng) => void;

  /** overlay ui */
  children?: ReactNode;
}

const BaseKakaoMap = ({
  center,
  level = 6,
  draggable = false,
  style = { width: "100%", height: "100%" },

  showMarker = true,
  markerSize = { width: 26, height: 37 },
  markerOffset = { x: 13, y: 20 },

  radius,
  showCircle = false,

  onDragEnd,
  children,
}: BaseKakaoMapProps) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ["services"],
  });

  const [mapCenter, setMapCenter] = useState(center);

  if (loading) return <MapLoadingState />;
  if (error) return <MapErrorState />;

  return (
    <div className="relative h-full w-full">
      <Map
        center={mapCenter}
        level={level}
        draggable={draggable}
        style={style}
        onDragEnd={(map) => {
          if (!onDragEnd) return;
          const latlng = map.getCenter();
          const nextCenter = {
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          };
          setMapCenter(nextCenter);
          onDragEnd(nextCenter);
        }}
      >
        {showMarker && (
          <MapMarker
            position={mapCenter}
            image={{
              src: "/kakao-map/marker.svg",
              size: markerSize,
              options: { offset: markerOffset },
            }}
          />
        )}

        {showCircle && radius && (
          <Circle
            center={mapCenter}
            radius={radius}
            strokeColor="#1EB87B"
            strokeWeight={1}
            fillColor="#1EB87B"
            fillOpacity={0.15}
          />
        )}
      </Map>

      {children}
    </div>
  );
};

export default BaseKakaoMap;
