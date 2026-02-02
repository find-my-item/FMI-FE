import { Icon } from "@/components/common";
import BaseStateLayout from "../BaseStateLayout/BaseStateLayout";

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
