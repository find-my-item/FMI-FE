"use client";

import { CSSProperties, ReactNode, useState } from "react";
import { Map, MapMarker, Circle, useKakaoLoader } from "react-kakao-maps-sdk";
import { MapErrorState, MapLoadingState } from "@/components/domain/BaseKakaoMap/_internal";

/**
 * @author jikwon
 *
 * @description
 * 카카오 지도를 사용하는 모든 화면의 기반이 되는 Base 컴포넌트입니다.
 *
 * - 카카오 지도 SDK 로딩을 내부에서 처리합니다.
 * - Marker, Circle(반경), 드래그 여부 등 공통 기능을 옵션(props)으로 제어합니다.
 * - 지도 위에 표시되는 UI(주소 오버레이 등)는 children으로 전달받아 렌더링합니다.
 *
 * 이 컴포넌트는 직접 사용하기보다는,
 * `PostDetailKakaoMap`, `PostWriteKakaoMap`과 같은
 * **프리셋 래퍼 컴포넌트**에서 사용하는 것을 권장합니다.
 *
 * @remarks
 * - 부모 요소는 반드시 `height`가 명시되어 있어야 합니다.
 *   (`min-height`만 있는 경우 지도는 렌더링되지 않습니다.)
 * - 지도, 마커, 원(Circle)과 관련된 구현 로직은 이 컴포넌트에서만 관리합니다.
 *
 * @param props.center
 * 지도의 중심 좌표입니다.
 *
 * @param props.level
 * 지도 확대 레벨입니다. 기본값은 6입니다.
 *
 * @param props.draggable
 * 지도의 드래그 가능 여부입니다. 기본값은 false입니다.
 *
 * @param props.style
 * 지도(Map) 컴포넌트에 전달되는 스타일 객체입니다.
 * 기본값은 `{ width: "100%", height: "100%" }` 입니다.
 *
 * @param props.showMarker
 * 중심 좌표에 마커를 표시할지 여부입니다. 기본값은 true입니다.
 *
 * @param props.markerSize
 * 마커 이미지의 크기입니다.
 *
 * @param props.markerOffset
 * 마커 이미지의 offset 값입니다.
 *
 * @param props.radius
 * 원(Circle)의 반경 값입니다. `showCircle`이 true일 때만 사용됩니다.
 *
 * @param props.showCircle
 * 중심 좌표 기준으로 반경 원(Circle)을 표시할지 여부입니다.
 *
 * @param props.onDragEnd
 * 지도 드래그가 끝났을 때 호출되는 콜백입니다.
 * 변경된 중심 좌표를 인자로 전달합니다.
 *
 * @param props.children
 * 지도 위에 오버레이로 표시할 UI 요소입니다.
 * (주소 표시 카드, 버튼 등)
 *
 * @example
 * ```tsx
 * <BaseKakaoMap
 *   center={{ lat: 37.5665, lng: 126.9780 }}
 *   level={6}
 *   showCircle
 *   radius={1000}
 * >
 *   <AddressOverlay />
 * </BaseKakaoMap>
 * ```
 */
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
