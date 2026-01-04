import Button from "@/components/common/Buttons/Button/Button";
import { ButtonHTMLAttributes } from "react";

interface FooterButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  ariaLabel: string;
}

const FooterButton = ({ name, ariaLabel, ...props }: FooterButton) => {
  return (
    <div className="sticky bottom-0 mt-auto h-[88px] w-full border-t border-divider-default bg-white px-4 py-3">
      <Button type="submit" variant="auth" ariaLabel={ariaLabel} {...props}>
        {name}
      </Button>
    </div>
  );
};

export default FooterButton;
