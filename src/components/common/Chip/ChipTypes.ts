export type ChipType = "status" | "category";

export interface ChipProps {
  label: string;
  type?: ChipType;
}
