import { Suspense } from "react";
import { DefaultListView } from "./_components";

const page = () => {
  return (
    <Suspense fallback={null}>
      <DefaultListView />
    </Suspense>
  );
};

export default page;
