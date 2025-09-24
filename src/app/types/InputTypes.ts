import { RegisterOptions } from "react-hook-form";

export type InputType = {
  id: string;
  label?: string;
  style: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  required?: boolean;
};
