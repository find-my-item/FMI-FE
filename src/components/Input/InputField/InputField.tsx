"use client";
"use no memo";

import { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils";
import { RegisterOptions, useFormContext } from "react-hook-form";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";
import Label from "../_internal/Label/Label";
import Caption from "../_internal/Caption/Caption";
import Counter from "../_internal/Counter/Counter";
import { useFormInput } from "../_internal/_hooks/useFormInput";

/**
 * @author suhyeon
 *
 * 서술형 텍스트를 작성할 수 있는 input 공통 컴포넌트 입니다.
 * react-hook-form를 필수로 사용한다는 전제하에 개발하였습니다.
 * react-hook-form으로 사용하실 곳은 상위 요소로 FormProvider를 사용해주시고 method는 onChange 모드로 설정하시면 됩니다.
 *
 *
 * @param items -  서술형 텍스트를 작성할 수 있는 input 공통 컴포넌트 props입니다.
 *  - 'name': 입력 필드의 id 및 register함수 사용을 위한 name
 *  - `validation`: 입력 필드의 유효성 검사를 위한 RegisterOption
 *  - 'disabled': 입력필드, 버튼을 disabled처리
 *  - 'label': 라벨의 텍스트
 *  - 'children': 버튼 텍스트 (동시에 버튼 결합 형태를 사용할 것을 의미합니다.)
 *  - 'eyeShow': 비밀번호 타입을 사용할 때 비밀번호 숨기기/보이기 기능을 추가
 *  - 'btnOnClick': 버튼이 눌렸을때 발생할 이벤트를 넣을 수 있는 옵션
 *  - 'isSuccess': 성공 caption을 보여주기 위한 옵션
 *  - 'successMessage': caption에 나타날 성공 메시지
 *  - 'rule':
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

interface InputFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  rule?: string;
  validation?: RegisterOptions;
}

const InputField = ({ name, label, validation, rule, ...props }: InputFieldProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { onDelete } = useFormInput();

  const isValue = watch(name) ?? "";
  const isValueStr = (isValue ?? "").toString();

  const maxLength =
    typeof validation?.maxLength === "number" ? validation.maxLength : validation?.maxLength?.value;

  return (
    <div className="flex w-full flex-col gap-1">
      <Label
        name={name}
        label={label}
        required={!!validation?.required}
        className="text-body2-regular text-layout-body-default"
      />

      <div className="relative">
        <textarea
          id={name}
          {...props}
          className={cn(
            "text-body4-regular h-[120px] w-full resize-none rounded-[10px] border border-neutral-normal-default p-3 hover:border-neutral-normal-hover focus:border-neutral-normal-focused disabled:border-neutral-normal-disabled disabled:bg-fill-neutral-normal-disabled",
            !!errors[name] && "!border-system-warning",
            isValue && "focus:border-neutral-normal-focused"
          )}
          {...register(name, validation)}
        />

        {/* 삭제 버튼 */}
        <DeleteButton
          value={isValue}
          className="right-[14px] top-[14px]"
          onDelete={() => onDelete(name)}
        />
      </div>

      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-layout-body-default">
        <Caption
          hasError={!!errors[name]}
          errorMessage={errors[name]?.message as string}
          rule={rule}
        />

        {/* 글자 수 확인 */}
        <Counter isLength={isValueStr.length} maxLength={maxLength} />
      </div>
    </div>
  );
};

export default InputField;
