import { DetailHeader } from "@/components/layout";
import DeleteAccountContainer from "./_components/DeleteAccountContainer/DeleteAccountContainer";

const page = () => {
  return (
    <>
      <DetailHeader title="회원 탈퇴" />
      <h1 className="sr-only">회원탈퇴 페이지</h1>

      <DeleteAccountContainer />
    </>
  );
};

export default page;
