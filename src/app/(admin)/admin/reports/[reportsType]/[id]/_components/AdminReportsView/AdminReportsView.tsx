import { LoadingState } from "@/components/state";
import { AdminDetailSection } from "@/app/(admin)/admin/_components";
import AdminReportsCommentSection from "../AdminReportsCommentSection/AdminReportsCommentSection";
import { ReportsType } from "../../_types/ReportsType";
import { useReportsDetailQuery } from "../../_hooks/useReportsDetailQuery";
import { AdminDetailInquiry } from "@/api/fetch/admin";

interface AdminReportsViewProps {
  id: number;
  type: ReportsType;
}

const AdminReportsView = ({ id, type }: AdminReportsViewProps) => {
  const { data, isLoading, isError } = useReportsDetailQuery({ id, type });

  if (isError) return null;

  let comments;

  // TODO(지권): 신고 댓글 추가 후 확인 필요
  if (type === "inquiry" && data?.result) {
    comments = (data.result as AdminDetailInquiry).comments;
  }

  return (
    <div className="flex flex-col h-base">
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <AdminDetailSection data={data?.result} type={type} />
          <AdminReportsCommentSection comments={comments} />
        </>
      )}
    </div>
  );
};

export default AdminReportsView;
