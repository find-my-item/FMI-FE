import { Button, Icon } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { useState } from "react";

const PERMISSION_CONFIG = {
  Location: {
    title: "더 편한 서비스를 위해 위치 정보를 접급의 허용해 주세요.",
    description: `위치 정보 허용 시 현재 위치를 기반으로\n 유실물 정보를 제공해요.`,
    iconName: "Marker" as const,
    agreeBtnText: "위치 접근 허용하기",
  },
  Alert: {
    title: "알림을 허용하고 더 많은 소식을 받아보세요.",
    description: `알림 허용은 마이페이지의 설정에서\n 언제든지 변경할 수 있어요.`,
    iconName: "AlertBell" as const,
    agreeBtnText: "알림 허용하기",
  },
};

interface DetailPermissionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  state: "Alert" | "Location";
}

const DetailPermissionSheet = ({ isOpen, onClose, state }: DetailPermissionSheetProps) => {
  const { iconName, title, description, agreeBtnText } = PERMISSION_CONFIG[state];

  const handleLocationPermission = () => {
    if (!navigator.geolocation) {
      alert("위치 기능을 지원하지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("위치 권한이 거부되었습니다. 브라우저 설정에서 허용해주세요.");
          return;
        }
      }
    );
  };

  return (
    <PopupLayout
      className="z-999 w-full px-5 py-[64px] flex-col-center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full gap-10 flex-col-center">
        <Icon name={iconName} size={78} />

        <div className="gap-3 flex-col-center">
          <h3 className="text-h3-semibold text-layout-header-default">{title}</h3>
          <p className="whitespace-pre-line text-center text-body2-medium text-layout-body-default">
            {description}
          </p>
        </div>

        <div className="w-full gap-3 flex-col-center">
          <Button className="w-full" onClick={handleLocationPermission}>
            {agreeBtnText}
          </Button>
          <button
            className="w-full py-2 text-body2-semibold text-neutralInversed-strong-default"
            onClick={onClose}
          >
            다음에 할래요.
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

interface PermissionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const PermissionSheet = ({ isOpen, onClose }: PermissionSheetProps) => {
  const [isLocationPermissionSheet, setIsLocationPermissionSheet] = useState(false);

  if (isLocationPermissionSheet) {
    return (
      <DetailPermissionSheet
        isOpen={isLocationPermissionSheet}
        onClose={() => {
          setIsLocationPermissionSheet(false);
        }}
        state="Location"
      />
    );
  }

  return (
    <PopupLayout
      className="z-999 w-full px-5 py-[64px] flex-col-center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full flex-col items-center gap-10 rounded-[20px] bg-white p-4">
        <h3 className="text-h3-semibold text-layout-header-default">
          서비스 사용을 위해 아래 권한을 허용해 주세요.
        </h3>

        <div className="flex w-full flex-col gap-6 rounded-[20px] p-5 bg-fill-neutral-subtle-default">
          <div className="flex w-full gap-[18px]">
            <Icon name="Marker" size={44} />
            <div className="flex flex-col gap-[2px]">
              <span className="text-body1-semibold text-layout-header-default">위치 (선택)</span>
              <span className="text-body1-semibold text-layout-body-default">
                현 위치 기반으로 유실물 정보 확인
              </span>
            </div>
          </div>

          <div className="flex w-full gap-[18px]">
            <Icon name="AlertBell" size={44} />
            <div className="flex flex-col gap-[2px]">
              <span className="text-body1-semibold text-layout-header-default">알림 (선택)</span>
              <span className="text-body1-semibold text-layout-body-default">
                찾아줘 서비스 알림 수신
              </span>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={() => setIsLocationPermissionSheet(true)}>
          확인
        </Button>
      </div>
    </PopupLayout>
  );
};

export default PermissionSheet;
