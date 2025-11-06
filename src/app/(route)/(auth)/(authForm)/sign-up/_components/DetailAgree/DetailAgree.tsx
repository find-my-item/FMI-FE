import { Button } from "@/components";
import { AgreeConfig } from "@/app/(route)/(auth)/_constant/Agreement";

interface DetailAgreeProps {
  termKey: string;
  onBack: () => void;
  onAgree: () => void;
}

const DetailAgree = ({ termKey, onBack, onAgree }: DetailAgreeProps) => {
  return (
    <>
      {/* TODO(수현): 어떤 주석인지 남기기 */}
      {/* <div>{AgreeConfig[termKey].title}</div> */}
      <div className="whitespace-pre-wrap px-4 py-6 text-body2-regular text-layout-body-default">
        {AgreeConfig[termKey].content}
      </div>

      {/* signUpFooter */}
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-flatGray-50 bg-white px-4 py-3">
        <Button type="button" onClick={onAgree} ariaLabel={termKey + "동의"}>
          동의
        </Button>
      </div>
    </>
  );
};

export default DetailAgree;
