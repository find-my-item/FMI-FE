import { DetailHeader } from "@/components/layout";
import { AdminWithdrawalReasonsView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="유저 탈퇴 사유" />
      <h1 className="sr-only">유저 탈퇴 사유</h1>

      <AdminWithdrawalReasonsView />
    </>
  );
};

export default page;
