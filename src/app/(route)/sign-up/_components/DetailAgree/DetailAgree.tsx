import { Button, DetailHeader } from "@/components";
import { AGREE_CONFIG } from "../../_constants/AGREE_CONFIG";

interface DetailAgreeProps {
  termName: string;
  onAgree: () => void;
}

const DetailAgree = ({ termName, onAgree }: DetailAgreeProps) => {
  const term = AGREE_CONFIG[termName as keyof typeof AGREE_CONFIG];

  // if (!term) {
  //   return (
  //     <>
  //       <DetailHeader title="약관" />
  //       <div className="whitespace-pre-wrap px-4 py-6 text-body2-regular text-layout-body-default">
  //         존재하지 않는 약관입니다.
  //       </div>
  //     </>
  //   )
  // };

  return (
    <>
      <DetailHeader title={term.title} />
      <div className="whitespace-pre-wrap px-4 py-6 text-body2-regular text-layout-body-default">
        {term.content}
      </div>

      {/* signUpFooter */}
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-flatGray-50 bg-white px-4 py-3">
        <Button type="button" variant="auth" onClick={onAgree} ariaLabel="동의 버튼">
          동의
        </Button>
      </div>
    </>
  );
};

export default DetailAgree;
