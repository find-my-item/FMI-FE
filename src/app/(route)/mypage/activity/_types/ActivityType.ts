export type ActivityType =
  | "POST"
  | "COMMENT"
  | "FAVORITE"
  | "INQUIRY"
  | "INQUIRY_REPLY"
  | "REPORT"
  | "REPORT_COMPLETE"
  | "ALERT_SETTING";

// TODO(수현): api 연결 시 api 스키마에 따라 변수 이름 변경 필요
export interface ActivityItemType {
  activityId: number;
  type: ActivityType;
  createdAt: string;
  title: string;
  subText?: string;
}

// TODO(수현): api 연결 시 api 스키마에 따라 변수 이름 변경 필요
export interface ActivityGroupType {
  groupId: number;
  groupDate: string;
  activityItem: readonly ActivityItemType[];
}
