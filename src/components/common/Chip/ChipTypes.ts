export type ChipType = "status" | "category" | "pending" | "received" | "resolved" | "admin";

export interface ChipProps {
  label: string;
  type?: ChipType;
}
