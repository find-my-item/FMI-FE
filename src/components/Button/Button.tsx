interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

const ButtonStyle =
  "w-full h-[44px] flex-center gap-1 rounded-[10px] bg-[#98E3BD] opacity-90 font-semibold text-[16px] text-white";

const Button = ({ children, type, className = ButtonStyle, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
