import { RegisterOptions, UseFormRegister, FieldError } from "react-hook-form";
import { FormValue } from "../../../(route)/(auth)/types/FormData";

interface InputProps {
  inputStyle: string;
  id: keyof FormValue;
  label?: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions<FormValue>;
  register: UseFormRegister<FormValue>;
  required?: boolean;
  error?: FieldError;
}

const Input = ({
  inputStyle,
  id,
  label,
  type = "text",
  placeholder = "",
  register,
  required = true,
  validation,
  error,
}: InputProps) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...register(id, validation)}
        className={inputStyle}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  );
};

export default Input;
