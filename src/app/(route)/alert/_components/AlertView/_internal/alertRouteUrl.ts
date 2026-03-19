import { ReferenceType } from "@/api/fetch/notification";

export const alertRouteUrl = (referenceType: ReferenceType, referenceId: number): string => {
  switch (referenceType) {
    case "POST":
    case "COMMENT":
      return `/list/${referenceId}`;
    // TODO(형준): 알림 목록 API 수정 후 동작 확인 필요
    case "CHAT":
      return `/chat/${referenceId}`;
    case "INQUIRY":
      return `/mypage/inquiries/${referenceId}`;
    case "NOTICE":
      return `/notice/${referenceId}`;
    case "REPORT":
      return `/mypage/reports/${referenceId}`;
    default:
      return "#";
  }
};
