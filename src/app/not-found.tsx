import { Icon } from "@/components";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="h-[100dvh] flex-col-center">
      <Icon name="NotFound" size={74} />
      <section className="gap-12 flex-col-center">
        <header className="gap-3 flex-col-center">
          <div className="mb-[6px] gap-[10px] flex-col-center">
            <h1 className="text-title2-medium text-layout-header-default">404</h1>
            <h2 className="text-h2-bold text-layout-header-default">페이지를 찾을 수 없습니다.</h2>
          </div>
          <p className="text-center text-body2-regular text-layout-body-default">
            존재하지 않는 주소를 입력했거나 <br />
            요청하신 페이지를 사용할 수 없습니다.
          </p>
        </header>

        <footer className="flex justify-center">
          <Link
            href="/"
            className="rounded-[10px] border border-neutral-normal-default px-5 py-[10px] text-body1-semibold text-neutral-normal-default bg-fill-neutral-normal-default"
          >
            이전 페이지로 돌아가기
          </Link>
        </footer>
      </section>
    </main>
  );
};

export default NotFound;
