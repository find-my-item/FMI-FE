import { IconName } from "@/components/common/Icon/Icon";

export interface AdminFilterItemType {
  label: string;
  onSelected: boolean;
  icon?: {
    name: IconName;
    size: number;
  };
  iconPosition?: "leading" | "trailing";
  onClick: () => void;
}
