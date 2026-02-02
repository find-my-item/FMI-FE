import { Icon } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import BaseStateLayout from "../BaseStateLayout/BaseStateLayout";

interface EmptyStateProps {
  icon: {
    iconName: IconName;
    iconSize: number;
  };
  title?: string;
  description?: string;
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  const { iconName, iconSize } = icon;

  return (
    <BaseStateLayout>
      <Icon name={iconName} size={iconSize} />
      {title && <p className="text-h2-bold text-layout-header-default">{title}</p>}
      {description && (
        <p className="whitespace-pre-line text-center text-body2-regular text-layout-body-default">
          {description}
        </p>
      )}
    </BaseStateLayout>
  );
};

export default EmptyState;
