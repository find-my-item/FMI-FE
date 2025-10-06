import { RegisterOptions } from "react-hook-form";

export type InputType = {
  name: string;
  label?: string;
  className?: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  required?: boolean;
  onConfirm?: React.FocusEventHandler<HTMLInputElement>;
  rule?: string;
};
