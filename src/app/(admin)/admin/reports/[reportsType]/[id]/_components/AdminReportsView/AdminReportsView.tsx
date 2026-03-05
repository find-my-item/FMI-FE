import { MOCK_REPORTS_DETAIL_DATA } from "@/mock/data";
import { DetailReportsType, useGetDetailReports } from "@/api/fetch/admin";
import { AdminDetailSection } from "@/app/(admin)/admin/_components";
import AdminReportsCommentSection from "../AdminReportsCommentSection/AdminReportsCommentSection";

interface AdminReportsViewProps {
  id: number;
  type: DetailReportsType;
}

const AdminReportsView = ({ id, type }: AdminReportsViewProps) => {
  const { data } = useGetDetailReports({ type, id });

  return (
    <div className="h-base">
      <AdminDetailSection data={MOCK_REPORTS_DETAIL_DATA} />

      <AdminReportsCommentSection />
    </div>
  );
};

export default AdminReportsView;
