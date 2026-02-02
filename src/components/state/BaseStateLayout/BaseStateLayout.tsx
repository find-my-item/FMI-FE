import { ReactNode } from "react";
import { cn } from "@/utils";

/**
 * @author jikwon
 *
 * @description
 * - 공통 state 컴포넌트의 레이아웃을 담당합니다.
 * - flex-col-center를 기본으로 적용합니다.
 *
 * @param children - state 컴포넌트의 자식 요소
 * @param className - 추가적인 className
 *
 * @example
 * <BaseStateLayout>
 *   <p>데이터가 없습니다.</p>
 * </BaseStateLayout>
 */

interface BaseStateLayoutProps {
  children: ReactNode;
  className?: string;
}

const BaseStateLayout = ({ children, className }: BaseStateLayoutProps) => {
  return (
    <div className={cn("h-full w-full gap-5 py-20 flex-col-center", className)}>{children}</div>
  );
};

export default BaseStateLayout;
