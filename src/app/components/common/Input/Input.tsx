import { RegisterOptions, useFormContext } from "react-hook-form";
import { FormValue } from "../../../(route)/(auth)/types/FormData";

interface InputProps {
  inputStyle: string;
  id: keyof FormValue;
  label?: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions<FormValue>;
  required?: boolean;
}

const Input = ({ inputStyle, id, label, type, placeholder, validation, required }: InputProps) => {
  const {
    register,
    watch,
    setError,
    formState: { errors },
  } = useFormContext();

  const password = watch("password");

  const onConfirm = (e: any) => {
    const target = e.target;
    if (target.name === "passwordConfirm" && target.value !== password) {
      console.log("비밀번호 불일치");
    }
  };

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...register(id, validation)}
        className={inputStyle}
        type={type}
        placeholder={placeholder}
        required={required}
        onBlur={onConfirm}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{}</p>}
    </div>
  );
};

export default Input;
