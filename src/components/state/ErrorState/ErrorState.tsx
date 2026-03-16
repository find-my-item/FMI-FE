import { ReactNode } from "react";
import { Icon } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import BaseStateLayout from "../BaseStateLayout/BaseStateLayout";

/**
 * @author jikwon
 *
 * @description
 * - 에러 화면에서 표시하는 state 컴포넌트입니다.
 * - BaseStateLayout을 사용하여 공통 레이아웃을 적용합니다.
 *
 * @example
 * ```tsx
 *  <ErrorState title="로딩 중..." />
 * ```
 *
 * ```tsx
 *  <ErrorState
 *    title="로딩 중..."
 *    description="로딩 중..."
 *    icon={{
 *      iconName: "Error",
 *      iconClass: "text-error",
 *      iconSize: 30,
 *    }}
 *  />
 * ```
 */

interface ErrorStateProps {
  /** 에러 화면의 대표 제목 */
  title?: string;
  /** 에러 화면의 설명 */
  description?: string;
  /** 에러 화면의 자식 요소 */
  children?: ReactNode;
  /** 에러 화면의 아이콘 */
  icon: {
    iconName?: IconName;
    iconClass?: string;
    iconSize?: number;
  };
}

const ErrorState = ({
  title = "오류가 발생했어요.",
  description,
  children,
  icon,
}: ErrorStateProps) => {
  const { iconName = "Error", iconClass, iconSize = 30 } = icon;

  return (
    <BaseStateLayout>
      <div role="alert" className="gap-5 flex-col-center">
        <Icon name={iconName} className={iconClass} size={iconSize} />
        <p className="text-h2-bold text-layout-header-default">{title}</p>
        {description && (
          <p className="whitespace-pre-line text-body2-regular text-layout-body-default">
            {description}
          </p>
        )}
      </div>
      {children}
    </BaseStateLayout>
  );
};

export default ErrorState;
