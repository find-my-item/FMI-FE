"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@/components/common";

interface LocationFormValues {
  location: string;
}

const Header = () => {
  const { register, handleSubmit } = useForm<LocationFormValues>();

  const onSubmit = (data: LocationFormValues) => {
    // TODO(형준): 위치 검색/제출 로직
  };

  return (
    <header className="fixed left-1/2 top-0 z-10 w-full max-w-[390px] -translate-x-1/2 px-5 py-[10px]">
      <form
        className="relative w-full rounded-[10px] bg-white px-5 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("location", { required: true })}
          type="text"
          className="w-full pl-8 text-h3-semibold text-flatGray-700 placeholder:text-flatGray-700"
          placeholder="현재 위치 (위치 정보 허용 시)"
        />
        <button aria-label="위치 검색" className="absolute left-5 top-[18.5px]">
          <Icon name="Search" size={20} />
        </button>
      </form>
    </header>
  );
};

export default Header;
