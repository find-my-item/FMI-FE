import { MOCK_REPORTS_DETAIL_DATA } from "@/mock/data";
import { AdminDetailSection } from "@/app/(admin)/admin/_components";
import AdminReportsCommentSection from "../AdminReportsCommentSection/AdminReportsCommentSection";

interface AdminReportsViewProps {
  id: number;
}

const AdminReportsView = ({ id }: AdminReportsViewProps) => {
  return (
    <div className="h-base">
      <AdminDetailSection data={MOCK_REPORTS_DETAIL_DATA} />

      <AdminReportsCommentSection />
    </div>
  );
};

export default AdminReportsView;
