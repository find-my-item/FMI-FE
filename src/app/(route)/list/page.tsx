import { Suspense } from "react";
import { ListView } from "./_components";

const page = () => {
  return (
    <Suspense fallback="">
      <ListView />
    </Suspense>
  );
};

export default page;
