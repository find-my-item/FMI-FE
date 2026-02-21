"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@/components/common";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { Suspense, useState } from "react";
import SideBar from "./_internal/SideBar";
import SearchFocusDropdown from "./_internal/SearchFocusDropdown";

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
  const { register, handleSubmit } = useForm<LocationFormValues>({
    defaultValues: { search: searchValue || "" },
  });
  const isDropdownOpen = searchValue || focused;

  const onSubmit = ({ search }: LocationFormValues) => {
    router.push(`/?search=${search}`);
    setFocused(false);
  };

  const handleBack = () => {
    if (focused) {
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
        {...register("search", { required: true })}
        type="text"
        onFocus={() => setFocused(true)}
        className="w-full pl-8 text-h3-semibold text-flatGray-700 placeholder:text-flatGray-700"
        placeholder="현재 위치 (위치 정보 허용 시)"
      />
      {!isDropdownOpen ? (
        <button type="submit" aria-label="위치 검색" className="absolute left-5 top-[18.5px]">
          <Icon name="Search" size={20} />
        </button>
      ) : (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleBack}
          aria-label="뒤로가기"
          className="absolute left-5 top-[18.5px]"
        >
          <Icon name="ArrowLeftSmall" size={20} />
        </button>
      )}
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
        (searchValue || focused) && "bg-white"
      )}
    >
      <HeaderSearchForm
        key={searchValue ?? "empty"}
        searchValue={searchValue}
        setFocused={setFocused}
        focused={focused}
      />
    </header>
  );
};

const MainSearchHeader = () => {
  // TODO(형준): 임시 사이드바 추가, 향후 제거
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Suspense fallback={""}>
      <div className="relative">
        <HeaderContent setFocused={setFocused} focused={focused} />
        <SearchFocusDropdown focused={focused} />
        <button onClick={() => setIsOpen(!isOpen)} className="absolute right-5 top-5 z-50">
          <Icon name="Menu" title="메뉴 열기" />
        </button>
        <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </Suspense>
  );
};

export default MainSearchHeader;
