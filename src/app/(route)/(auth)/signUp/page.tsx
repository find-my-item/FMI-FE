// "use client";

// import { FormProvider, useForm } from "react-hook-form";
// import { FormValue, signUpInputObject } from "../constant/FormData";
// import Input from "@/app/components/common/Input/Input";
// import Button from "@/app/components/common/Button/Button";
// import { InputStyle } from "../styles/authStyle";

// const Page = () => {
//   const methods = useForm<FormValue>();

//   const onSubmit = (data: any) => {
//     alert("폼 제출되었습니다.");
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         {signUpInputObject.map((item) => (
//           <Input item={item} key={item.id} className={InputStyle} />
//         ))}
//         <Button children="회원가입" type="submit" style="bg-slate-400 w-50 h-30" />
//       </form>
//     </FormProvider>
//   );
// };

// export default Page;
"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormValue, signUpInputObject } from "../constant/FormData";
import Input from "@/app/components/common/Input/Input";
import Button from "@/app/components/common/Button/Button";
import { InputStyle } from "../styles/authStyle";

const Page = () => {
  const methods = useForm<FormValue>();

  const onSubmit = (data: any) => {
    alert("폼 제출되었습니다.");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {signUpInputObject.map((item) => (
          <Input
            key={item.name}
            name={item.name}
            type="text"
            className={InputStyle}
            label={item.label}
            placeholder={item.placeholder}
            validation={item.validation}
          />
        ))}
        <Button children="회원가입" type="submit" style="bg-slate-400 w-50 h-30" />
      </form>
    </FormProvider>
  );
};

export default Page;
