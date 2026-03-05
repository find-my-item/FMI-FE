import { Button } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import { AGREE_CONFIG } from "../../_constants/AGREE_CONFIG";
import { useFormContext } from "react-hook-form";
import { FooterButton } from "@/components/domain";

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
      <div className="whitespace-pre-wrap px-4 pb-[calc(88px+24px)] pt-6 text-body2-regular text-layout-body-default h-base">
        {term.content}
      </div>

      <FooterButton onClick={handleAgreeClick}>동의</FooterButton>
    </>
  );
};

export default DetailAgree;
