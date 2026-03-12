import { DetailHeader } from "@/components/layout";
import { AGREE_CONFIG } from "../../../app/(route)/sign-up/_constants/AGREE_CONFIG";
import { FooterButton } from "@/components/domain";

interface TermsProps {
  termName: string;
  onAgree?: () => void;
  showButton?: boolean;
}

const Terms = ({ termName, onAgree, showButton = false }: TermsProps) => {
  const term = AGREE_CONFIG[termName as keyof typeof AGREE_CONFIG];

  if (!term) {
    return null;
  }

  return (
    <>
      <DetailHeader title={term.title} />
      <div className="whitespace-pre-wrap px-4 pb-[calc(88px+24px)] pt-6 text-body2-regular text-layout-body-default h-base">
        {term.content}
      </div>

      {showButton && <FooterButton onClick={onAgree}>동의</FooterButton>}
    </>
  );
};

export default Terms;
