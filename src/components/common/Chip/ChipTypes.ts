export type ChipType =
  | "brandSubtle"
  | "neutralStrong"
  | "brandNormal"
  | "admin"
  | "toast"
  | "neutralDisabled";

export interface ChipProps {
  label: string;
  type?: ChipType;
}
