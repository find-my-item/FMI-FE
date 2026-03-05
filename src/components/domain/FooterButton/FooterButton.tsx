import Button from "@/components/common/Buttons/Button/Button";
import { ButtonHTMLAttributes } from "react";

/**
 * @author suhyeon
 *
 * footer에서 사용되는 버튼 컴포넌트입니다.
 *
 * @param children - 버튼 텍스트를 의미합니다.
 * @param 버튼의 모든 옵션들을 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * <FooterButton>
 * 완료
 * </FooterButton>
 * ```
 */

interface FooterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const FooterButton = ({ children, ...props }: FooterButtonProps) => {
  return (
    <footer className="sticky bottom-0 h-[88px] w-full border-t border-divider-default bg-white px-4 pb-8 pt-3">
      <Button type="button" variant="auth" {...props}>
        {children}
      </Button>
    </footer>
  );
};

export default FooterButton;
