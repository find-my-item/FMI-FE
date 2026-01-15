import { Suspense } from "react";
import { ListView } from "@/app/(route)/chat/_components";

const page = () => {
  return (
    <div className="h-base">
      <Suspense fallback="">
        <ListView />
      </Suspense>
    </div>
  );
};

export default page;
