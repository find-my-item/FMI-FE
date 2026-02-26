"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@/components/common";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { Suspense, useRef, useState } from "react";
import SideBar from "./_internal/SideBar";
import SearchFocusDropdown from "../SearchFocusDropdown/SearchFocusDropdown";
import MainSearchLayout from "../MainSearchLayout/MainSearchLayout";

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
}: FocusedProps & { searchValue: string | null }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<LocationFormValues>({
    defaultValues: { search: searchValue || "" },
  });
  const { ref: registerRef, ...searchRegister } = register("search", { required: true });
  const isDropdownOpen = searchValue || focused;

  const onSubmit = ({ search }: LocationFormValues) => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
    router.push(`/?search=${trimmedSearch}`);
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
        className="absolute left-5 top-[18.5px]"
      >
        <Icon name={isDropdownOpen ? "ArrowLeftSmall" : "Search"} size={20} />
      </button>
    </form>
  );
};

const HeaderContent = ({ setFocused, focused }: FocusedProps) => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");

  return (
    <header
      className={cn(
        "fixed left-1/2 top-0 z-10 w-full max-w-[768px] -translate-x-1/2 px-5 py-[10px]",
        (searchValue || focused) && "border-x-2 bg-white"
      )}
    >
      <HeaderSearchForm searchValue={searchValue} setFocused={setFocused} focused={focused} />
    </header>
  );
};

const MainSearchHeader = () => {
  // TODO(형준): 임시 사이드바 추가, 향후 제거
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Suspense fallback={""}>
      <MainSearchLayout focused={focused}>
        <div className="relative">
          <HeaderContent setFocused={setFocused} focused={focused} />
          <SearchFocusDropdown focused={focused} />
          <button onClick={() => setIsOpen(!isOpen)} className="absolute right-5 top-4 z-50">
            <Icon name="Menu" title="메뉴 열기" />
          </button>
        </div>
      </MainSearchLayout>
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Suspense>
  );
};

export default MainSearchHeader;
