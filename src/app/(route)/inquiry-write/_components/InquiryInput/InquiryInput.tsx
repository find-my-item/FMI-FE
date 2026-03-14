import { RequiredText } from "@/components/common";
import { useHorizontalDragScroll } from "@/hooks";
import { cn } from "@/utils";
import { InputHTMLAttributes } from "react";
import { FieldValues, useFormContext, UseFormSetValue, useWatch } from "react-hook-form";

interface InquiryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
}

const EMAIL_AUTO_COMPLETE_LIST = [
  "gmail.com",
  "naver.com",
  "daum.net",
  "kakao.com",
  "hanmail.net",
  "nate.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "yahoo.com",
];

const EmailAutoComplete = ({
  email,
  setValue,
}: {
  email: string;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const { ref: scrollRef, onMouseDown } = useHorizontalDragScroll();

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      className="hide-scrollbar flex w-full cursor-grab gap-1 overflow-x-auto overflow-y-hidden whitespace-nowrap pl-5 active:cursor-grabbing"
    >
      {EMAIL_AUTO_COMPLETE_LIST.map((item) => {
        const completedEmail = `${email}@${item}`;

        return (
          <button
            type="button"
            key={item}
            aria-label={`${item} 이메일 자동완성`}
            className="shrink-0 select-none rounded-full px-[6px] py-1 text-caption2-regular text-layout-header-default bg-fill-neutral-strong-default"
            onClick={() => setValue("email", completedEmail)}
          >
            {completedEmail}
          </button>
        );
      })}
    </div>
  );
};

const InquiryInput = ({ name, className, ...props }: InquiryInputProps) => {
  const { register, control, setValue } = useFormContext();
  const inputValue = useWatch({ control, name });
  const { placeholder, ...inputProps } = props;

  const isEmailField = name === "email";
  const emailValue = typeof inputValue === "string" ? inputValue : "";
  const shouldShowEmailAutoComplete =
    isEmailField && emailValue.length > 0 && !emailValue.includes("@");

  return (
    <div>
      <div className={cn("px-5 py-2", shouldShowEmailAutoComplete && "mb-3 pb-0")}>
        <div className="relative">
          <input
            {...register(name)}
            className={cn(
              "peer w-full rounded-full px-4 py-3 text-body1-regular text-layout-header-default bg-fill-neutral-subtle-default placeholder:text-layout-body-default focus:border focus:border-brand-normal-default focus:outline-none disabled:bg-fill-neutral-subtle-pressed",
              className
            )}
            placeholder={placeholder}
            {...inputProps}
          />
          {!inputValue && placeholder && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
            >
              <span className="invisible text-body1-regular">{placeholder}</span>
              <RequiredText />
            </span>
          )}
        </div>
      </div>
      {shouldShowEmailAutoComplete && <EmailAutoComplete email={emailValue} setValue={setValue} />}
    </div>
  );
};

export default InquiryInput;
