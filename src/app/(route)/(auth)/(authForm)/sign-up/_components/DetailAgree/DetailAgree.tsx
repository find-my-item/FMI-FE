import { Button, DetailHeader } from "@/components";
import { AGREE_CONFIG } from "../../_constant/AGREE_CONFIG";

interface DetailAgreeProps {
  termName: string;
  onAgree: () => void;
}

const DetailAgree = ({ termName, onAgree }: DetailAgreeProps) => {
  return (
    <>
      <DetailHeader title={AGREE_CONFIG[termName].title} />
      <div className="whitespace-pre-wrap px-4 py-6 text-body2-regular text-layout-body-default">
        {AGREE_CONFIG[termName].content}
      </div>

      {/* signUpFooter */}
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-flatGray-50 bg-white px-4 py-3">
        <Button type="button" onClick={onAgree} ariaLabel={termName + "동의"}>
          동의
        </Button>
      </div>
    </>
  );
};

export default DetailAgree;
