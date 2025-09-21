interface ButtonProps {
  name: string,
  bnType: "submit" | "button" | "reset",
  bnStyle: string,
}

const Button = ({ name, bnType, bnStyle }: ButtonProps) => {
  return (
    <div>
      <button type={bnType} className={bnStyle}>{name}</button>
    </div>
  )
}

export default Button;