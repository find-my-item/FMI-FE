import { Icon } from "@/components/common";
import BaseStateLayout from "../BaseStateLayout/BaseStateLayout";

/**
 * @author jikwon
 *
 * @description
 * - 로딩 중일 때 표시하는 state 컴포넌트입니다.
 * - BaseStateLayout을 사용하여 공통 레이아웃을 적용합니다.
 *
 * @param title - 제목
 *
 * @example
 * <LoadingState title="로딩 중..." />
 */

interface LoadingStateProps {
  title?: string;
}

const LoadingState = ({ title = "페이지 로딩 중..." }: LoadingStateProps) => {
  return (
    <BaseStateLayout>
      <div role="status" aria-live="polite" className="gap-5 flex-col-center">
        <Icon name="Loading" className="animate-spin" size={30} />
        <p className="text-h2-bold text-layout-header-default">{title}</p>
      </div>
    </BaseStateLayout>
  );
};

export default LoadingState;
