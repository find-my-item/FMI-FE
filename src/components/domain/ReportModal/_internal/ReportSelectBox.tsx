import { Icon, RequiredText } from "@/components/common";
import { cn } from "@/utils";
import { ReportReason } from "./ReportTypes";

interface ReportSelectBoxProps {
  reportType: ReportReason | null;
  setOpenReportReasonModal: (open: boolean) => void;
}

const ReportSelectBox = ({ reportType, setOpenReportReasonModal }: ReportSelectBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-body2-regular text-layout-body-default">
        신고 사유 <RequiredText />
      </label>
      <button
        type="button"
        aria-label="신고 사유 선택"
        onClick={() => setOpenReportReasonModal(true)}
        className={cn(
          "flex items-center justify-between rounded-[10px] border border-neutral-normal-default px-5 py-[18px] text-body1-medium",
          reportType ? "text-neutral-normal-enteredSelected" : "text-neutral-normal-placeholder"
        )}
      >
        {reportType ? reportType.label : "신고 사유를 선택해 주세요."}
        <Icon name="ArrowDown" size={24} />
      </button>
    </div>
  );
};

export default ReportSelectBox;
