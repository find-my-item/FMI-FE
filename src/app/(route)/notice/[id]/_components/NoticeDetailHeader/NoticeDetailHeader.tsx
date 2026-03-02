import { DetailHeader } from "@/components/layout";
import { HeaderShare, HeaderStar } from "@/components/layout/DetailHeader/DetailHeaderParts";

const NoticeDetailHeader = () => {
  return (
    <DetailHeader>
      <HeaderStar isActive={false} />
      <HeaderShare />
    </DetailHeader>
  );
};

export default NoticeDetailHeader;
