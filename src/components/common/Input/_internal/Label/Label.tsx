import { RequiredText } from "@/components/common";
import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  name: string;
  label?: string;
  required?: boolean;
}

const Label = ({ name, label, required, ...props }: LabelProps) => {
  return (
    <label htmlFor={name} {...props}>
      {label}
      {required && <RequiredText />}
    </label>
  );
};

export default Label;
