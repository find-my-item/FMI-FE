import { AdminDetailGuestInquiry, AdminDetailInquiry, AdminDetailReport } from "@/api/fetch/admin";
import { formatDate } from "@/utils";
import { getDetailContentVM } from "../../../_utils/DetailContentVM";

interface DetailContentProps {
  data: AdminDetailGuestInquiry | AdminDetailReport | AdminDetailInquiry;
}

const DetailContent = ({ data }: DetailContentProps) => {
  const viewModel = getDetailContentVM(data);

  if (!viewModel) return null;

  const { title, content, createdAt, userEmailLabel } = viewModel;

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
function getDetailViewModel(
  data: AdminDetailGuestInquiry | AdminDetailReport | AdminDetailInquiry
) {
  throw new Error("Function not implemented.");
}
