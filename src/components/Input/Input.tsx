import { useFormContext } from "react-hook-form";
import { InputType } from "@/types/InputTypes";
import { InputStyle } from "@/app/(route)/(auth)/_constant/authStyle";
import Icon from "../Icon/Icon";
import { cn } from "@/utils/cn";

const Input = ({ name, type, className = InputStyle, ...rest }: InputType) => {
  const { register, watch, setValue } = useFormContext();

  const value = watch(name);
  const showClear = !!value;

  return (
    <div className="relative flex w-full flex-col">
      <input {...register(name, rest.validation)} type={type} className={className} {...rest} />

      {/* 삭제 버튼 */}
      <button
        className={cn(
          "flex-center absolute right-2 top-1/2 h-[16.67px] w-[16.67px] -translate-y-1/2 rounded-full bg-[#9D9D9D] outline-none",
          !showClear && "opacity-0"
        )}
        onClick={() =>
          setValue(name, "", { shouldValidate: true, shouldDirty: true, shouldTouch: true })
        }
      >
        <Icon name="Delete" aria-label="입력값 지우기" size={6.97} />
      </button>
    </div>
  );
};

export default Input;
