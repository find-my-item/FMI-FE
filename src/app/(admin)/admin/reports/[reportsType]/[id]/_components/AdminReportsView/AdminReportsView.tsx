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

  if (isLoading) return <LoadingState />;
  if (isError) return null;

  return (
    <div className="h-base">
      <AdminDetailSection data={data?.result} />

      <AdminReportsCommentSection />
    </div>
  );
};

export default AdminReportsView;
