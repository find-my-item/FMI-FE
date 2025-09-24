interface ButtonProps {
  children: string;
  type: "submit" | "button" | "reset";
  style: string;
}

const Button = ({ children, type, style }: ButtonProps) => {
  return (
    <button type={type} className={style}>
      {children}
    </button>
  );
};

export default Button;
