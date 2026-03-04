import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MOCK_FAQ_ITEMS } from "./MOCK_FAQ_ITEMS";
import { getExpandedIndexFromHash, getFaqAnchorId } from "./supportFaqAccordionUtils";

const useSupportFaqAccordion = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    setExpandedIndex(getExpandedIndexFromHash());
    const syncHash = () => setExpandedIndex(getExpandedIndexFromHash());
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const handleToggle = (index: number) => {
    const next = expandedIndex === index ? null : index;
    setExpandedIndex(next);
    const qs = searchParams.toString();
    const base = qs ? `${pathname}?${qs}` : pathname;
    router.replace(next !== null ? `${base}#${getFaqAnchorId(MOCK_FAQ_ITEMS[index].id)}` : base, {
      scroll: false,
    });
  };

  return { expandedIndex, handleToggle };
};

export default useSupportFaqAccordion;
