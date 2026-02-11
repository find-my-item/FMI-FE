export interface InfoOption {
  label: string;
  value: "report" | "leave";
  textColor: "text-neutral-normal-default" | "text-system-warning";
  position: "first" | "last";
}

export const INFO_OPTIONS: InfoOption[] = [
  {
    label: "차단, 신고하기",
    value: "report",
    textColor: "text-neutral-normal-default",
    position: "first",
  },
  {
    label: "채팅방 나가기",
    value: "leave",
    textColor: "text-system-warning",
    position: "last",
  },
];
