"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { InputSearch } from "@/components/common";
import { useGetSearchKeyword } from "@/api/fetch/post";
import { LIST_SEARCH_PLACEHOLDER } from "./LIST_SEARCH_PLACEHOLDER";
import PostSearchView from "./_internal/PostSearchView";
import RegionSearchView from "./_internal/RegionSearchView";

interface ListSearchProps {
  searchMode: "region" | "post";
}

const ListSearch = ({ searchMode }: ListSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    methods.resetField(`${searchMode}Search`);
  }, [searchMode]);

  const { data: listData } = useGetSearchKeyword({
    keyword,
    size: 10,
  });
  console.log("검색 데이터:", listData);

  const handleSearchSubmit = () => {
    const raw = methods.getValues(`${searchMode}Search`);
    const value = raw?.trim();

    if (!value || value === keyword) return;

    if (searchMode === "post") {
      router.replace(`/list?search=${searchMode}&keyword=${value}`);
    } else {
      router.replace(`/region?keyword=${value}`);
    }
  };

  return (
    <div className="h-base">
      <FormProvider {...methods}>
        <div className="px-5 py-[10px]">
          <InputSearch
            mode="RHF"
            name={`${searchMode}Search`}
            placeholder={LIST_SEARCH_PLACEHOLDER[searchMode]}
            onEnter={handleSearchSubmit}
          />
        </div>
      </FormProvider>

      {searchMode === "post" ? <PostSearchView data={listData ?? []} /> : <RegionSearchView />}
    </div>
  );
};

export default ListSearch;
