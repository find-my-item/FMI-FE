import { Suspense } from "react";
import { ContentAgreeHeader, ContentAgreeView } from "./_components";

const page = () => {
  return (
    <>
      <ContentAgreeHeader />

      <Suspense fallback={null}>
        <ContentAgreeView />
      </Suspense>
    </>
  );
};

export default page;
