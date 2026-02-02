import { Icon } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import BaseStateLayout from "../BaseStateLayout/BaseStateLayout";

/**
 * @author jikwon
 *
 * @description
 * - 데이터가 없을 때 표시하는 state 컴포넌트입니다.
 * - BaseStateLayout을 사용하여 공통 레이아웃을 적용합니다.
 *
 * @param icon - 아이콘 정보
 * @param title - 제목
 * @param description - 설명
 *
 * @example
 * <EmptyState
 *   icon={{
 *     iconName: "Empty",
 *     iconSize: 50,
 *   }}
 *   title="데이터가 없습니다."
 *   description="데이터가 없습니다."
 * />
 */

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
