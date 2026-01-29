// export type ChipType = "status" | "category" | "pending" | "received" | "resolved" | "admin";
export type ChipType = "brandSubtle" | "neutralStrong" | "brandNormal" | "admin";

export interface ChipProps {
  label: string;
  type?: ChipType;
}
