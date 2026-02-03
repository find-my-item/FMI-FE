import Link from "next/link";
import { Button, Icon } from "@/components/common";

const NotFound = () => {
  return (
    <main className="min-h-screen flex-col-center">
      <Icon name="NotFound" size={74} />

      <section className="space-y-12">
        <header className="gap-[6px] flex-col-center">
          <div className="gap-[10px] py-1 flex-col-center">
            <h1 className="text-title2-medium text-layout-header-default">404</h1>
            <h2 className="text-h2-bold text-layout-header-default">페이지를 찾을 수 없습니다.</h2>
          </div>

          <p className="text-center text-body2-regular text-layout-body-default">
            존재하지 않는 주소를 입력했거나 <br />
            요청하신 페이지를 사용할 수 없습니다.
          </p>
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

export default NotFound;
