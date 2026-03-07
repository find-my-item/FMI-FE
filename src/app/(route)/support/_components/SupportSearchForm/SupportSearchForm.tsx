"use client";

import { InputSearch } from "@/components/common";
import { FormProvider, useForm } from "react-hook-form";

const SupportSearchForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})} className="mt-[10px] px-5 py-[10px]">
        <InputSearch
          name="supportSearch"
          mode="onChange"
          onEnter={() => {}}
          placeholder="키워드를 검색해보세요"
        />
      </form>
    </FormProvider>
  );
};

export default SupportSearchForm;
