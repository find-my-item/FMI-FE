interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className: string;
  label: string;
}

const buttonStyle = {
  // 추후 추가 예정
};

const Button = ({ children, type, className, label, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={className} aria-label={label}>
      {children}
    </button>
  );
};

export default Button;
