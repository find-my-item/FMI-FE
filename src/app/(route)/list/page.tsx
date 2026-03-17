import { Suspense } from "react";
import { DefaultListView } from "./_components";

const page = ({ searchParams }: { searchParams: { redirect?: string } }) => {
  console.log("searchParams>> ", searchParams.redirect);

  return (
    <Suspense fallback={null}>
      <DefaultListView />
    </Suspense>
  );
};

export default page;
