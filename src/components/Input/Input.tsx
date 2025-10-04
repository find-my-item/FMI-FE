import { useFormContext } from "react-hook-form";
import { InputType } from "@/types/InputTypes";

const InputStyle =
  "flex items-center w-full h-[50px] px-[14px] py-[12.5px] bg-[#F5F5F5] rounded-[10px] text-[#9D9D9D] text-[14px]";

const Input = ({ name, type, className = InputStyle, ...rest }: InputType) => {
  const {
    register,
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext();

  const fieldError = errors[name]?.message as string;
  const showError = (!!touchedFields[name] || isSubmitted) && !!fieldError;

  return (
    <div className="w-full">
      {rest.label && (
        <label htmlFor={name}>
          {rest.label}
          {rest.validation?.required && <span className="text-[#1EB87B]">*</span>}
        </label>
      )}
      <input {...register(name, rest.validation)} type={type} className={className} {...rest} />
      {showError && <p className="mt-1 text-sm text-red-500">{fieldError}</p>}
    </div>
  );
};

export default Input;
