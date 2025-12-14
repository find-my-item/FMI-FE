"use client";

import { DetailHeader, InputSearch } from "@/components";
import { FormProvider, useForm } from "react-hook-form";

const page = () => {
  const methods = useForm({
    defaultValues: {
      location: "",
    },
  });

  return (
    <div className="h-[100dvh] w-full">
      <h1 className="sr-only">분실/습득 등록 페이지</h1>
      <DetailHeader title="위치등록" />

      <section className="px-5 py-[10px]">
        <FormProvider {...methods}>
          <InputSearch
            placeholder="지역명을 입력해 주세요."
            name="location"
            mode="onChange"
            onEnter={(value) => console.log(value)}
          />
        </FormProvider>
      </section>

      <section></section>
    </div>
  );
};

export default page;
