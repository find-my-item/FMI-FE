import { Icon } from "@/components/common";
import BaseStateLayout from "../BaseStateLayout/BaseStateLayout";

interface LoadingStateProps {
  title?: string;
}

const LoadingState = ({ title = "페이지 로딩 중..." }: LoadingStateProps) => {
  return (
    <BaseStateLayout>
      <Icon name="Loading" className="animate-spin" size={30} />
      <p className="text-h2-bold text-layout-header-default">{title}</p>
    </BaseStateLayout>
  );
};

export default LoadingState;
