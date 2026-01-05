import Button from "@/components/common/Buttons/Button/Button";
import { ButtonHTMLAttributes } from "react";

interface FooterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const FooterButton = ({ label, ...props }: FooterButtonProps) => {
  return (
    <footer className="sticky bottom-0 mt-auto h-[88px] w-full border-t border-divider-default bg-white px-4 py-3">
      <Button type="submit" variant="auth" {...props}>
        {label}
      </Button>
    </footer>
  );
};

export default FooterButton;
