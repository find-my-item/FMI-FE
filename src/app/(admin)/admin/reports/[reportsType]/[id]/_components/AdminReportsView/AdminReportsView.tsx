import AdminReportsCommentSection from "../AdminReportsCommentSection/AdminReportsCommentSection";
import AdminReportsDetailSection from "../AdminReportsDetailSection/AdminReportsDetailSection";

const AdminReportsView = () => {
  return (
    <div className="h-base">
      <AdminReportsDetailSection />

      <AdminReportsCommentSection />
    </div>
  );
};

export default AdminReportsView;
