"use client";
"use no memo";

import { FormProvider, useForm } from "react-hook-form";
import { FormValue } from "./types/FormValue";

export default function AuthSubLayout({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormValue>({
    mode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
