import { Icon } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";

interface MypageEmptyUIProps {
  titleText: string;
  subText: string;
  IconName: IconName;
}
const MypageEmptyUI = ({ titleText, subText, IconName }: MypageEmptyUIProps) => {
  return (
    <div className="gap-5 py-20 text-center flex-col-center">
      <Icon name={IconName} size={70} />
      <h2 className="text-h2-bold text-layout-header-default">아직 {titleText}이 없어요.</h2>
      <p className="text-body2-regular text-layout-body-default">
        아직 {titleText}이 없습니다. <br />
        {subText}
      </p>
    </div>
  );
};

export default MypageEmptyUI;
