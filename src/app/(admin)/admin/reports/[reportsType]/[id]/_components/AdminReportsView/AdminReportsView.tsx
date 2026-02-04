import { MOCK_REPORTS_DETAIL_DATA } from "@/mock/data";
import AdminReportsCommentSection from "../AdminReportsCommentSection/AdminReportsCommentSection";
import AdminReportsDetailSection from "../AdminReportsDetailSection/AdminReportsDetailSection";

interface AdminReportsViewProps {
  id: number;
}

const AdminReportsView = ({ id }: AdminReportsViewProps) => {
  return (
    <div className="h-base">
      <AdminReportsDetailSection data={MOCK_REPORTS_DETAIL_DATA} />

      <AdminReportsCommentSection />
    </div>
  );
};

export default AdminReportsView;
