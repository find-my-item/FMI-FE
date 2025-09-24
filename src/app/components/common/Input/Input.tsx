import { RegisterOptions, useFormContext } from "react-hook-form";
import { InputType } from "@/app/types/InputTypes";

const Input = (props: InputType) => {
  const {
    register,
    watch,
    clearErrors,
    setError,
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext();

  const password = watch("password");

  const onConfirm = (e: any) => {
    const { name, value } = e.target;
    if (name === "passwordConfirm") {
      // 값이 없으면 초기 로딩/첫 포커스아웃에서 에러 만들지 않음
      if (!value) {
        clearErrors("passwordConfirm");
        return;
      }
      if (value !== password) {
        setError("passwordConfirm", {
          type: "validate",
          message: "비밀번호가 일치하지 않습니다.",
        });
      } else {
        clearErrors("passwordConfirm");
      }
    }
  };

  const fieldError = errors[props.id];
  const showError = (!!touchedFields[props.id] || isSubmitted) && !!fieldError?.message;

  return (
    <div>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        {...register(props.id, props.validation)}
        className={props.style}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onBlur={onConfirm}
      />
      {showError && <p className="text-red-500 text-sm mt-1">{String(fieldError?.message)}</p>}
    </div>
  );
};

export default Input;
