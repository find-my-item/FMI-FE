export type ChipType = "brandSubtle" | "neutralStrong" | "brandNormal" | "admin";

export interface ChipProps {
  label: string;
  type?: ChipType;
}
