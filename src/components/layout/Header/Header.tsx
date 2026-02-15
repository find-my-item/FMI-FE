"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@/components/common";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { Suspense } from "react";

interface LocationFormValues {
  search: string;
}

const HeaderSearchForm = ({ searchValue }: { searchValue: string | null }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LocationFormValues>({
    defaultValues: { search: searchValue || "" },
  });

  const onSubmit = ({ search }: LocationFormValues) => router.push(`/?search=${search}`);

  return (
    <form
      className={cn(
        "relative w-full rounded-[10px] bg-white px-5 py-4",
        searchValue && "border border-black/25"
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("search", { required: true })}
        type="text"
        className="w-full pl-8 text-h3-semibold text-flatGray-700 placeholder:text-flatGray-700"
        placeholder="현재 위치 (위치 정보 허용 시)"
      />
      {!searchValue ? (
        <button type="submit" aria-label="위치 검색" className="absolute left-5 top-[18.5px]">
          <Icon name="Search" size={20} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="absolute left-5 top-[18.5px]"
        >
          <Icon name="ArrowLeftSmall" size={20} />
        </button>
      )}
    </form>
  );
};

const HeaderContent = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");

  return (
    <header
      className={cn(
        "fixed left-1/2 top-0 z-10 w-full max-w-[390px] -translate-x-1/2 px-5 py-[10px]",
        searchValue && "bg-white"
      )}
    >
      <HeaderSearchForm key={searchValue ?? "__empty__"} searchValue={searchValue} />
    </header>
  );
};

const Header = () => {
  return (
    <Suspense fallback={""}>
      <HeaderContent />
    </Suspense>
  );
};

export default Header;
