"use client";

import "@/app/globals.css";
import { ErrorView } from "@/components/state";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="mx-auto max-w-[390px] border-2 flex-col-center">
        <ErrorView
          // TODO(지권): 아이콘 크기 확인 필요
          iconName="ServerError"
          code="500"
          title="서버에 문제가 발생했습니다"
          description={
            <>
              현재 서버에 일시적인 문제가 발생했습니다. <br />
              잠시 후 다시 시도해주세요.
            </>
          }
        />
      </body>
    </html>
  );
}
