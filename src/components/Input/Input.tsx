import { useFormContext } from "react-hook-form";
import { InputType } from "@/types/InputTypes";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";

const Input = ({ name, type, className = InputStyle, ...rest }: InputType) => {
  const { register } = useFormContext();

  return (
    <div className="flex w-full flex-col gap-2">
      {rest.label && (
        <label htmlFor={name} className="text-[#363636]">
          {rest.label}
          {rest.validation?.required && <span className="text-[#1EB87B]">*</span>}
        </label>
      )}
      <input {...register(name, rest.validation)} type={type} className={className} {...rest} />
    </div>
  );
};

export default Input;
