import Button from "@/components/Buttons/Button/Button";
import { AgreeConfig } from "../../../_constant/Agreement";

interface DetailAgreeProps {
  termKey: string;
  onBack: () => void;
  onAgree: () => void;
}

const DetailAgree = ({ termKey, onBack, onAgree }: DetailAgreeProps) => {
  return (
    <>
      {/* <div>{AgreeConfig[termKey].title}</div> */}
      <div className="whitespace-pre-wrap px-4 py-6 text-[14px] text-[#787878]">
        {AgreeConfig[termKey].content}
      </div>

      {/* signUpFooter */}
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-[#E4E4E4] bg-white px-4 py-3">
        <Button type="button" onClick={onAgree} ariaLabel={termKey + "동의"}>
          동의
        </Button>
      </div>
    </>
  );
};

export default DetailAgree;
