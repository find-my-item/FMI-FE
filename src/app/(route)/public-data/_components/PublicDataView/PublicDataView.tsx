import { FilterSection, Tab } from "@/components/domain";
import { PublicDataList } from "../_internal";
import { usePublicDataTabQuery } from "../../_hooks/usePublicDataTabQuery/usePublicDataTabQuery";

const PublicDataView = () => {
  const { PUBLIC_LIST_TABS, activeTab, handleTabChange } = usePublicDataTabQuery();

  return (
    <>
      <Tab
        tabs={PUBLIC_LIST_TABS}
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
