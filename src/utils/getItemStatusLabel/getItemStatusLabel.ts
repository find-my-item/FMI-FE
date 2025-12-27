import { ItemStatus } from "@/api/list/types";

export const getItemStatusLabel = (status: ItemStatus): string => {
  const STATUS_LABEL: Record<ItemStatus, string> = {
    SEARCHING: "찾는중",
    FOUND: "찾았음",
  };

  return STATUS_LABEL[status];
};
