import { Button } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import { AGREE_CONFIG } from "../../_constants/AGREE_CONFIG";
import { useFormContext } from "react-hook-form";

interface DetailAgreeProps {
  termName: string;
  onAgree: () => void;
}

const DetailAgree = ({ termName, onAgree }: DetailAgreeProps) => {
  const term = AGREE_CONFIG[termName as keyof typeof AGREE_CONFIG];

  const { setValue } = useFormContext();

  const handleAgreeClick = () => {
    setValue(termName, true, { shouldDirty: true, shouldValidate: true });
    onAgree();
  };

  return (
    <>
      <DetailHeader title={term.title} />
      <div className="whitespace-pre-wrap px-4 py-6 text-body2-regular text-layout-body-default">
        {term.content}
      </div>

      {/* signUpFooter */}
      <div className="fixed bottom-[85px] z-40 h-[88px] w-full max-w-[767px] border-t border-divider-default px-4 pb-8 pt-3">
        <Button type="button" variant="auth" onClick={handleAgreeClick} ariaLabel="동의 버튼">
          동의
        </Button>
      </div>
    </>
  );
};

export default DetailAgree;
