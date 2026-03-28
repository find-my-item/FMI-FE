"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@/components/common";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { Suspense, useEffect, useRef, useState } from "react";
import SearchFocusDropdown from "../SearchFocusDropdown/SearchFocusDropdown";
import MainSearchLayout from "../MainSearchLayout/MainSearchLayout";
import { useMainRecentSearch } from "@/store";

interface LocationFormValues {
  search: string;
}

interface FocusedProps {
  setFocused: (focused: boolean) => void;
  focused: boolean;
}

const HeaderSearchForm = ({
  searchValue,
  setFocused,
  focused,
  setSearchKeyword,
}: FocusedProps & { searchValue: string | null; setSearchKeyword: (value: string) => void }) => {
  const router = useRouter();
  const addRecentSearch = useMainRecentSearch((s) => s.addRecentSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue } = useForm<LocationFormValues>({
    defaultValues: { search: searchValue ?? "" },
  });
  const { ref: registerRef, ...searchRegister } = register("search", { required: true });
  const isDropdownOpen = searchValue || focused;

  useEffect(() => {
    setValue("search", searchValue ?? "");
    setSearchKeyword(searchValue ?? "");
  }, [searchValue, setSearchKeyword, setValue]);

  const onSubmit = ({ search }: LocationFormValues) => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
    addRecentSearch(trimmedSearch);
    router.push(`/?search=${encodeURIComponent(trimmedSearch)}`);
    setFocused(false);
  };

  const handleBack = () => {
    if (focused) {
      inputRef.current?.blur();
      setFocused(false);
      return;
    }
    router.back();
  };

  return (
    <form
      className={cn(
        "relative w-full rounded-[10px] bg-white px-5 py-4",
        isDropdownOpen && "border border-black/25"
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...searchRegister}
        ref={(el) => {
          registerRef(el);
          inputRef.current = el;
        }}
        onChange={(e) => {
          searchRegister.onChange(e);
          setSearchKeyword(e.target.value);
        }}
        type="text"
        onFocus={() => setFocused(true)}
        className="w-full pl-8 text-h3-semibold text-flatGray-700 placeholder:text-flatGray-700"
        placeholder="현재 위치 (위치 정보 허용 시)"
      />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={isDropdownOpen ? handleBack : handleSubmit(onSubmit)}
        aria-label={isDropdownOpen ? "뒤로가기" : "위치 검색"}
        className="absolute left-5 top-1/2 -translate-y-1/2"
      >
        <Icon name={isDropdownOpen ? "ArrowLeftSmall" : "Search"} size={20} />
      </button>
    </form>
  );
};

const HeaderContent = ({
  setFocused,
  focused,
  setSearchKeyword,
}: FocusedProps & { setSearchKeyword: (value: string) => void }) => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");

  return (
    <header
      className={cn(
        "fixed left-1/2 top-0 z-10 w-full max-w-[768px] -translate-x-1/2 px-5 py-[10px]",
        (searchValue || focused) && "border-x-2 bg-white"
      )}
    >
      <HeaderSearchForm
        searchValue={searchValue}
        setFocused={setFocused}
        focused={focused}
        setSearchKeyword={setSearchKeyword}
      />
    </header>
  );
};

const MainSearchHeader = () => {
  const [focused, setFocused] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Suspense fallback={""}>
      <MainSearchLayout focused={focused}>
        <div className="relative">
          <HeaderContent
            setFocused={setFocused}
            focused={focused}
            setSearchKeyword={setSearchKeyword}
          />
          <SearchFocusDropdown
            focused={focused}
            setFocused={setFocused}
            searchKeyword={searchKeyword}
          />
        </div>
      </MainSearchLayout>
    </Suspense>
  );
};

export default MainSearchHeader;
