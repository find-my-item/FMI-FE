import { FilterSection, Tab } from "@/components/domain";
import { useRouter, useSearchParams } from "next/navigation";
import { PublicDataList } from "../_internal";

type PublicDataTabType = "lost" | "found";

const TABS: { label: string; key: PublicDataTabType }[] = [
  { label: "분실", key: "lost" },
  { label: "습득", key: "found" },
];

const PublicDataView = () => {
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

export default PublicDataView;
