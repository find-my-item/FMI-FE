import Button from "@/components/Button/Button";
import { AgreeConfig } from "../../../_constant/Agreement";

interface Props {
  termKey: string;
  onBack: () => void;
  onAgree: () => void;
}

const DetailAgree = ({ termKey, onBack, onAgree }: Props) => {
  return (
    <>
      {/* <div>{AgreeConfig[termKey].title}</div> */}
      <div className="whitespace-pre-wrap px-4 py-6 text-[14px] text-[#787878]">
        {AgreeConfig[termKey].content}
      </div>

      {/* signUpFooter */}
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-[#E4E4E4] bg-white px-4 py-3">
        <Button type="button" onClick={onAgree} label="회원가입 버튼">
          동의
        </Button>
      </div>
    </>
  );
};

export default DetailAgree;
