import { DetailHeader } from "@/components/layout";
import { AdminWithdrawalReasonsView } from "./_components";
import { ScrollToTopButton } from "@/components/common";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <>
      <DetailHeader title="유저 탈퇴 사유" />
      <h1 className="sr-only">유저 탈퇴 사유</h1>

      <AdminWithdrawalReasonsView />

      <ScrollToTopButton className="fixed-button-position-bottom" />
    </>
  );
};

export default page;
