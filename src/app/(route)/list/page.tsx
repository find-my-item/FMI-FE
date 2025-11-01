import ListView from "./_components/ListView/ListView";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback="">
      <ListView />
    </Suspense>
  );
};

export default page;
