import Button from "@/components/common/Buttons/Button/Button";
import { ButtonHTMLAttributes } from "react";

interface FooterButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

const FooterButton = ({ name, ...props }: FooterButton) => {
  return (
    <footer className="sticky bottom-0 mt-auto h-[88px] w-full border-t border-divider-default bg-white px-4 py-3">
      <Button type="submit" variant="auth" {...props}>
        {name}
      </Button>
    </footer>
  );
};

export default FooterButton;
