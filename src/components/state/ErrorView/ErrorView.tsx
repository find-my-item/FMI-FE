import Link from "next/link";
import { Button, Icon } from "@/components/common";

/**
 * @author jikwon
 *
 * @description
 * - not-found, global-error에서 공통으로 사용하는 페이지 컴포넌트입니다.
 *
 * @param iconName - 아이콘 이름
 * @param code - 에러 코드
 * @param title - 에러 제목
 * @param description - 에러 설명
 *
 * @example
 * <ErrorView
 *   iconName="NotFound"
 *   code="404"
 *   title="페이지를 찾을 수 없습니다."
 *   description={
 *     <>
 *       존재하지 않는 주소를 입력했거나 <br />
 *       요청하신 페이지를 사용할 수 없습니다.
 *     </>
 *   }
 * />
 */

interface ErrorViewProps {
  code: string;
  title: string;
  description: React.ReactNode;
  iconName: "NotFound" | "ServerError";
}

const ErrorView = ({ code, title, description, iconName }: ErrorViewProps) => {
  return (
    <main className="min-h-screen flex-col-center">
      <Icon name={iconName} size={74} />

      <section className="space-y-12">
        <header className="gap-[6px] flex-col-center">
          <div className="gap-[10px] py-1 flex-col-center">
            <h1 className="text-title2-medium text-layout-header-default">{code}</h1>
            <h2 className="text-h2-bold text-layout-header-default">{title}</h2>
          </div>

          <p className="text-center text-body2-regular text-layout-body-default">{description}</p>
        </header>

        <footer className="flex-center">
          <Button as={Link} href="/" variant="outlined" replace className="min-h-11">
            홈으로 이동하기
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default ErrorView;
