"use client";

import { FormProvider, useForm } from "react-hook-form";
import PostSearchView from "./_internal/PostSearchView";
import RegionSearchView from "./_internal/RegionSearchView";
import { LIST_SEARCH_PLACEHOLDER } from "./LIST_SEARCH_PLACEHOLDER";
import { useEffect } from "react";
import InputSearch from "@/components/common/Input/InputSearch/InputSearch";

interface ListSearch {
  searchMode: "region" | "post";
}

const ListSearch = ({ searchMode }: ListSearch) => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    methods.resetField(`${searchMode}Search`);
  }, [searchMode]);

  return (
    <>
      <FormProvider {...methods}>
        <div className="px-5 py-[10px]">
          <InputSearch
            mode="RHF"
            name={`${searchMode}Search`}
            placeholder={LIST_SEARCH_PLACEHOLDER[searchMode]}
            onEnter={() => {}}
          />
        </div>
      </FormProvider>
      {searchMode === "post" ? <PostSearchView /> : <RegionSearchView />}
    </>
  );
};

export default ListSearch;
