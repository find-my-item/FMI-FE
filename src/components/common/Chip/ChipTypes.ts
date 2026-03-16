export type ChipType =
  | "brandSubtle"
  | "neutralStrong"
  | "brandNormal"
  | "admin"
  | "toast"
  | "neutralDisabled"
  | "brandSubtleHover";

export interface ChipProps {
  label: string;
  type?: ChipType;
  className?: string;
}
