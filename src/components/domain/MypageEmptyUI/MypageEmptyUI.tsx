import { Icon } from "@/components/common";
import { EMPTY_CONSTANTS } from "./_constants/EMPTY_CONSTANTS";
import { cn } from "@/utils";

interface MypageEmptyUIProps {
  pageType: "posts" | "comments" | "reports" | "inquiries" | "activity" | "favorites";
}

const MypageEmptyUI = ({ pageType }: MypageEmptyUIProps) => {
  const target = EMPTY_CONSTANTS[pageType];

  return (
    <div className="gap-5 py-20 text-center flex-col-center">
      <Icon
        name={target.iconName}
        size={70}
        className={cn(pageType == "activity" && "w-[160px]")}
      />
      <h2 className="text-h2-bold text-layout-header-default">아직 {target.titleText}이 없어요.</h2>
      <p className="text-body2-regular text-layout-body-default">
        아직 {target.titleText}이 없습니다. <br />
        {target.subText}
      </p>
    </div>
  );
};

export default MypageEmptyUI;
