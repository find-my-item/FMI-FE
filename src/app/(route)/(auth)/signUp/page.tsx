import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../components/common/Input/Input";
import { FormValue, signUpInputObject } from "../types/FormData";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
    alert("폼 제출되었습니다.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {signUpInputObject.map((item) => (
          <div key={item.id}>
            <Input
              register={register}
              id={item.id}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              required={item.required}
              validation={item.validation}
              error={errors[item.id]}
            />
          </div>
        ))}

        <button type="submit" className="bg-slate-400 w-50 h-30">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Page;
