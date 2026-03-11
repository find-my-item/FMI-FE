import { LoadingState } from "@/components/state";
import { AdminDetailSection } from "@/app/(admin)/admin/_components";
import AdminReportsCommentSection from "../AdminReportsCommentSection/AdminReportsCommentSection";
import { ReportsType } from "../../_types/ReportsType";
import { useReportsDetailQuery } from "../../_hooks/useReportsDetailQuery";

interface AdminReportsViewProps {
  id: number;
  type: ReportsType;
}

const AdminReportsView = ({ id, type }: AdminReportsViewProps) => {
  const { data, isLoading, isError } = useReportsDetailQuery({ id, type });

  if (isError) return null;

  return (
    <div className="flex flex-col h-base">
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <AdminDetailSection data={data?.result} type={type} />
          <AdminReportsCommentSection />
        </>
      )}
    </div>
  );
};

export default AdminReportsView;
