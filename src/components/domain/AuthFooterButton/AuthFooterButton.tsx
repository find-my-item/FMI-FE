import Button from "@/components/common/Buttons/Button/Button";

interface AuthFooterButton {
  name: string;
  ariaLabel: string;
}

const AuthFooterButton = ({ name, ariaLabel }: AuthFooterButton) => {
  return (
    <div className="sticky bottom-0 mt-auto h-[88px] w-full border-t border-divider-default bg-white px-4 py-3">
      <Button type="submit" variant="auth" ariaLabel={ariaLabel}>
        {name}
      </Button>
    </div>
  );
};

export default AuthFooterButton;
