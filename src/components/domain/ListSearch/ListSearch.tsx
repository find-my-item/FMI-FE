"use client";

import { FormProvider, useForm } from "react-hook-form";
import RegionSearchView from "./_internal/RegionSearchView";
import InputSearch from "@/components/common/Input/InputSearch/InputSearch";

const ListSearch = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
      <FormProvider {...methods}>
        <div className="px-5 py-[10px]">
          <InputSearch
            mode="RHF"
            name="regionSearch"
            placeholder="시/군/구를 입력해 주세요."
            onEnter={() => {}}
          />
        </div>
      </FormProvider>

      <RegionSearchView />
    </>
  );
};

export default ListSearch;
