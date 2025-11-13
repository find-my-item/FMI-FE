"use client";
"use no memo";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/utils";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Buttons/Button/Button";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";
import Label from "../_internal/Label/Label";
import Caption from "../_internal/Caption/Caption";
import Counter from "../_internal/Counter/Counter";
import { useFormInput } from "../_internal/_hooks/useFormInput";

/**
 * @author suhyeon
 *
 * 일반 텍스트, 비밀번호를 입력받을 수 있고 버튼 결합 형태도 가능한 input 공통 컴포넌트 입니다.
 * react-hook-form를 필수로 사용한다는 전제하에 개발하였습니다.
 * react-hook-form으로 사용하실 곳은 상위 요소로 FormProvider를 사용해주시고 method는 onChange 모드로 설정하시면 됩니다.
 *
 *
 * @param items -  일반 텍스트, 비밀번호를 입력받을 수 있고 버튼 결합 형태를 선택할 수 있는 props입니다.
 *  - 'name': 입력 필드의 id 및 register함수 사용을 위한 name
 *  - 'type': 입력 필드의 타입을 선택할 default로 'text'를 지정해놓았습니다. 그 외 타입들은 지정해주면 됩니다.
 *  - 'className': 입력필드의 스타일
 *  - `validation`: 입력 필드의 유효성 검사를 위한 RegisterOption
 *  - 'disabled': 입력필드, 버튼을 disabled처리
 *  - 'label': 라벨의 텍스트
 *  - 'children': 버튼 텍스트 (동시에 버튼 결합 형태를 사용할 것을 의미합니다.)
 *  - 'eyeShow': 비밀번호 타입을 사용할 때 비밀번호 숨기기/보이기 기능을 추가
 *  - 'btnOnClick': 버튼이 눌렸을때 발생할 이벤트를 넣을 수 있는 옵션
 *  - 'isSuccess': 성공 caption을 보여주기 위한 옵션
 *  - 'successMessage': caption에 나타날 성공 메시지
 *  - 'rule': capation에 나타날 입력 필드의 규칙
 *
 *
 * @example 입력필드만 사용
 * ```tsx
 * <FormProvider {...methods}>
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *     <InputText
 *       name="test"
 *       validation={{maxLength: {value: 10, message: "10자 이내로 입력해주세요."}}}
 *       label="테스트"
 *       rule="2~10자 이내로 입력해주세요."
 *     />
 *   </form>
 * </FormProvider>
 * ```
 *
 * ```tsx 버튼 결합 형태
 * <FormProvider {...methods}>
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *     <InputText
 *       name="test"
 *       validation={{maxLength: {value: 10, message: "10자 이내로 입력해주세요."}}}
 *       label="테스트"
 *       rule="2~10자 이내로 입력해주세요."
 *       btnOnClick={(v) => console.log(v)}
 *     > 버튼이름
 *    </InputText>
 *   </form>
 * </FormProvider>
 *
 *
 */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  className?: string;
  validation?: RegisterOptions;
  disabled?: true;
}

interface CustomProps {
  label?: string;
  children?: ReactNode;
  eyeShow?: boolean;
  btnOnClick?: (value: string) => void;
  btnType?: "button" | "submit" | "reset";
  isSuccess?: boolean;
  successMessage?: string;
  rule?: string;
}

type InputTextProps = InputProps & CustomProps;

const InputStyle =
  "flex flex-1 items-center relative h-10 py-3 px-2 bg-fill-neutral-strong-default rounded-[10px] text-body2-regular text-neutral-strong-entered placeholder:text-neutral-strong-placeholder hover:text-neutral-strong-hover border focus:outline-none focus:text-neutral-strong-focused disabled:text-neutral-strong-disabled";

const InputText = ({
  name,
  type = "text",
  className = InputStyle,
  validation,
  disabled,
  label,
  children,
  eyeShow = false,
  btnOnClick,
  btnType = "button",
  isSuccess,
  successMessage,
  rule,
  ...props
}: InputTextProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { onDelete } = useFormInput();

  const isValue = watch(name) ?? "";
  const isValueStr = (isValue ?? "").toString();

  const [show, setShow] = useState(false);
  const actualType = () => {
    if (eyeShow && (name === "password" || name === "passwordConfirm")) {
      return show ? "text" : "password";
    }
    return type;
  };

  const maxLengthValue =
    typeof validation?.maxLength === "number" ? validation.maxLength : validation?.maxLength?.value;

  return (
    <div className="flex w-full flex-col gap-2">
      {/* label */}
      <Label
        name={name}
        label={label}
        required={!!validation?.required}
        className="text-body2-medium text-layout-header-default"
      />

      <div className="flex w-full flex-row gap-2">
        <div className="relative flex w-full flex-row">
          <input
            id={name}
            {...props}
            {...register(name, validation)}
            type={actualType()}
            disabled={disabled}
            className={cn(
              className,
              isValue && "pr-8",
              eyeShow && "pr-[60px]",
              !!errors[name] && "border border-system-warning"
            )}
          />

          {/* 삭제 버튼 */}
          <DeleteButton
            eyeShow={eyeShow}
            className="top-1/2 -translate-y-1/2"
            value={isValue}
            onDelete={() => onDelete(name)}
          />

          {/* 비밀번호 눈 모양 버튼 */}
          {eyeShow && (
            <button
              className="absolute right-2 top-3 outline-none flex-center"
              type="button"
              aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShow(!show)}
            >
              <Icon name={show ? "EyeOpen" : "EyeOff"} size={16} />
            </button>
          )}
        </div>

        {/* with Button */}
        {children && (
          <Button
            variant="outlined"
            type={btnType}
            onClick={() => btnOnClick?.(isValue)}
            ignoreBase
            disabled={disabled}
            className="w-auto whitespace-nowrap rounded-[10px] px-[14px] py-[10px] text-body2-semibold"
          >
            {children}
          </Button>
        )}
      </div>

      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-layout-body-default">
        <Caption
          isSuccess={isSuccess}
          successMessage={successMessage}
          hasError={!!errors[name]}
          errorMessage={errors[name]?.message as string}
          rule={rule}
        />

        {/* 글자 수 확인 */}
        <Counter isLength={isValueStr.length} maxLength={maxLengthValue} />
      </div>
    </div>
  );
};

export default InputText;
