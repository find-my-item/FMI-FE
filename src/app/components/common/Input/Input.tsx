import { useFormContext } from "react-hook-form";
import { InputType } from "@/types/InputTypes";

const Input = ({ name, type, className, ...rest }: InputType) => {
  const {
    register,
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext();

  const fieldError = errors[name]?.message as string;
  const showError = (!!touchedFields[name] || isSubmitted) && !!fieldError;

  return (
    <div>
      {rest.label && <label htmlFor={name}>{rest.label}</label>}
      <input {...register(name, rest.validation)} type={type} className={className} {...rest} />
      {showError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
    </div>
  );
};

export default Input;
