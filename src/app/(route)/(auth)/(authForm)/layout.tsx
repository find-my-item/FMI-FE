"use client";

import { FormProvider, useForm } from "react-hook-form";
import { FormValue } from "../_constant/FormData";

export default function AuthSubLayout({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormValue>({
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
