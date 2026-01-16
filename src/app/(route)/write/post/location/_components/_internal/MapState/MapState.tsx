import { ReactNode } from "react";
import { Icon } from "@/components/common";

type StateLayoutProps = {
  icon: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  containerClassName?: string;
  contentClassName?: string;
};

const StateLayout = ({
  icon,
  title,
  children,
  containerClassName = "h-full w-full bg-flatGray-25 flex-col-center",
  contentClassName = "min-h-[162px] w-[181px] flex-col-center",
}: StateLayoutProps) => {
  return (
    <section className={containerClassName}>
      <div className={contentClassName}>
        <div className="gap-2 flex-col-center">
          {icon}
          <span className="text-h2-bold text-layout-header-default">{title}</span>
        </div>

        {children}
      </div>
    </section>
  );
};

const MapLoadingState = () => {
  return (
    <StateLayout
      icon={<Icon name="Logo" size={70} />}
      title="페이지 로딩 중입니다."
      contentClassName="min-h-[162px] w-[181px] flex-col-center gap-8"
    >
      <Icon name="Loading" className="animate-spin" size={30} />
    </StateLayout>
  );
};

const MapErrorState = () => {
  return (
    <StateLayout
      icon={<Icon name="AlertState" size={70} />}
      title="지도를 표시할 수 없습니다."
      contentClassName="min-h-[162px] min-w-[181px] flex-col-center gap-5"
    >
      <span className="text-center text-body2-regular text-layout-body-default">
        일시적인 서비스 오류가 발생했습니다. <br />
        잠시 후 다시 시도해 주세요.
      </span>
    </StateLayout>
  );
};

export { MapLoadingState, MapErrorState };
