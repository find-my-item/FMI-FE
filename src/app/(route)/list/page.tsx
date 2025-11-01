import ListView from "./_components/ListView/ListView";
import { Suspense } from "react";

const page = () => {
  return (
    // 형준: useSearchParams 훅 사용을 위해 별도 컴포넌트 분리 후, Suspense 적용
    <Suspense fallback="">
      <ListView />
    </Suspense>
  );
};

export default page;
