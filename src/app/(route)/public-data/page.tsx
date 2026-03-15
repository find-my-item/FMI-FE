"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { PublicDataList } from "./_components/_internal";
import { Icon } from "@/components/common";
import { FilterSection, Tab } from "@/components/domain";
import { useRouter, useSearchParams } from "next/navigation";

type PublicDataTabType = "lost" | "found";

const TABS: { label: string; key: PublicDataTabType }[] = [
  { label: "분실", key: "lost" },
  { label: "습득", key: "found" },
];

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab: PublicDataTabType = searchParams.get("type") === "lost" ? "lost" : "found";

  const handleTabChange = (key: PublicDataTabType) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("type", key);

    router.replace(`/public-data?${params.toString()}`);
  };

  return (
    <>
      <DetailHeader title={<Icon name="DetailPolice24" size={154} />}>
        <HeaderSearch />
      </DetailHeader>

      <Tab
        tabs={TABS}
        selected={activeTab}
        onValueChange={(key) => handleTabChange(key)}
        className="sticky left-0 top-[56px]"
      />

      <div className="h-base">
        <FilterSection pageType="PUBLIC_DATA" />

        <PublicDataList />
      </div>
    </>
  );
};

export default page;
