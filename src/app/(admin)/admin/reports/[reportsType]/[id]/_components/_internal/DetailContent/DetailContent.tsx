import { AdminDetailGuestInquiry, AdminDetailReports } from "@/api/fetch/admin";
import { formatDate } from "@/utils";

interface DetailContentProps {
  data: AdminDetailGuestInquiry | AdminDetailReports;
}

const DetailContent = ({ data }: DetailContentProps) => {
  const { title, createdAt, content } = data;
  const userEmailLabel =
    "type" in data
      ? data.type === "REPORT"
        ? data.reporterEmail
        : data.userEmail
      : data.userEmail || "";

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-h2-bold text-layout-header-default">{title}</h2>
        <div className="flex items-center text-body2-regular text-layout-body-default">
          <span className="block after:mx-1 after:content-['·']">{userEmailLabel}</span>
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </div>
      </div>

      <p className="text-body1-regular text-layout-header-default">{content}</p>
    </div>
  );
};

export default DetailContent;
