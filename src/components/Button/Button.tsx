interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
  label?: string;
}

const buttonStyle = {
  // 추후 추가 예정
};

const Button = ({ children, type, className, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
