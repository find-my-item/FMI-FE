import { cn } from "@/utils";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InquiryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
}

const InquiryInput = ({ name, className, ...props }: InquiryInputProps) => {
  const { register } = useFormContext();

  return (
    <div className="px-5 py-2">
      <input
        {...register(name)}
        className={cn(
          "w-full rounded-full px-4 py-3 text-body1-regular text-layout-header-default bg-fill-neutral-subtle-default placeholder:text-layout-body-default focus:border focus:border-brand-normal-default focus:outline-none disabled:bg-fill-neutral-subtle-pressed",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default InquiryInput;
