import { DetailHeader } from "@/components/layout";
import DeleteAccountForm from "./_components/DeleteAccountForm/DeleteAccountForm";

const page = () => {
  return (
    <>
      <DetailHeader title="회원 탈퇴" />
      <h1 className="sr-only">회원탈퇴 페이지</h1>

      <DeleteAccountForm />
    </>
  );
};

export default page;
