"use client";

import { usePathname } from "next/navigation";
import { MOCK_REGIONS } from "../MOCK_REGIONS";
import Link from "next/link";

const RegionSearchView = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col">
      {MOCK_REGIONS.map(({ value }) => (
        <Link
          key={value}
          href={`${pathname}?region=${value}`}
          className="min-h-[60px] w-full border-b border-neutral-normal-default bg-white px-[20px] py-[20px] text-left text-body2-medium text-neutral-strong-default"
        >
          {value}
        </Link>
      ))}
    </section>
  );
};

export default RegionSearchView;
