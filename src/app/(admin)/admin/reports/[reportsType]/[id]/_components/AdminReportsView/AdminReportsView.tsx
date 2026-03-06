import { DetailReportsType, useGetDetailReports } from "@/api/fetch/admin";
import { LoadingState } from "@/components/state";
import { AdminDetailSection } from "@/app/(admin)/admin/_components";
import AdminReportsCommentSection from "../AdminReportsCommentSection/AdminReportsCommentSection";

interface AdminReportsViewProps {
  id: number;
  type: DetailReportsType;
}

const AdminReportsView = ({ id, type }: AdminReportsViewProps) => {
  const { data, isLoading, isError } = useGetDetailReports({ type, id });

  if (isError) return null;

  return (
    <div className="flex flex-col h-base">
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <AdminDetailSection data={data?.result} />
          <AdminReportsCommentSection />
        </>
      )}
    </div>
  );
};

export default AdminReportsView;
