import { Fragment } from "react";
import AdminReportsItem from "../../../_components/AdminReportsItem/AdminReportsItem";

const ReportsList = () => {
  return (
    <section aria-label="신고/문의 목록">
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Fragment key={index}>
            <AdminReportsItem status="PENDING" replyStatus="UNANSWERED" />
            <AdminReportsItem status="REVIEWED" replyStatus="UNANSWERED" />
            <AdminReportsItem status="RESOLVED" replyStatus="ANSWERED" />
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default ReportsList;
