import { RequiredText } from "@/components";
import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  name: string;
  label?: string;
  required?: boolean;
}

const Label = ({ name, label, required, ...props }: LabelProps) => {
  return (
    <label {...props} htmlFor={name}>
      {label}
      {required && <RequiredText />}
    </label>
  );
};

export default Label;
