import { DetailHeader } from "@/components/layout";
import { HeaderPost } from "@/components/layout/DetailHeader/DetailHeaderParts";

interface InquiryWriteDetailHeaderProps {
  isDisabled: boolean;
  onSubmit: () => void;
}

const InquiryWriteDetailHeader = ({ isDisabled, onSubmit }: InquiryWriteDetailHeaderProps) => {
  return (
    <>
      <DetailHeader title="무엇을 도와드릴까요?">
        <HeaderPost disabled={isDisabled} onClick={onSubmit} />
      </DetailHeader>
      <h1 className="sr-only">1:1 문의하기 작성</h1>
      <hr className="border border-labelsVibrant-quaternary" />
    </>
  );
};

export default InquiryWriteDetailHeader;
