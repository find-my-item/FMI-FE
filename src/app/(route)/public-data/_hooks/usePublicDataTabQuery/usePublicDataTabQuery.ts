import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

type PublicDataTabType = "lost" | "found";

const PUBLIC_LIST_TABS: { label: string; key: PublicDataTabType }[] = [
  { label: "분실", key: "lost" },
  { label: "습득", key: "found" },
];

export const usePublicDataTabQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab: PublicDataTabType = searchParams.get("type") === "lost" ? "lost" : "found";

  const handleTabChange = (key: PublicDataTabType) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("type", key);

    router.replace(`/public-data?${params.toString()}`);
  };

  return {
    activeTab,
    handleTabChange,
    PUBLIC_LIST_TABS,
  };
};
