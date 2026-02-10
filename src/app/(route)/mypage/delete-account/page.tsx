import { DetailHeader } from "@/components/layout";
import { DeleteAccountContainer } from "./_components";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <DetailHeader title="회원 탈퇴" />
      <h1 className="sr-only">회원탈퇴 페이지</h1>

      <Suspense fallback="">
        <DeleteAccountContainer />
      </Suspense>
    </>
  );
};

export default page;
