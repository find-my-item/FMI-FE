import React from "react";
import { RegisterOptions, UseFormRegister, FieldError } from "react-hook-form";
import { FormValue } from "../../(route)/(auth)/types/FormData";

const InputStyle = "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]";

interface InputProps {
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
        className={InputStyle}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  );
};

export default Input;
