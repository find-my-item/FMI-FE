export const PERMISSION_ITEM = [
  {
    iconName: "Marker" as const,
    title: "위치 (선택)",
    description: "현 위치 기반으로 유실물 정보 확인",
  },
  {
    iconName: "AlertBell" as const,
    title: "알림 (선택)",
    description: "찾아줘 서비스 알림 수신",
  },
];

export const PERMISSION_CONFIG = {
  Location: {
    title: "더 편한 서비스를 위해 위치 정보를 접근의 허용해 주세요.",
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
