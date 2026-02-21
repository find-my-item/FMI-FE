import { Suspense } from "react";
import { DefaultListView } from "./_components";

const page = () => {
  return (
    <Suspense fallback="">
      <DefaultListView />
    </Suspense>
  );
};

export default page;
